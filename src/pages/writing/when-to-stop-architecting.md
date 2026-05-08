---
layout: ../../layouts/Post.astro
title: When to Stop Architecting
description: A memory bug, a microservice I almost built, and one line of Fly config. On knowing when not to keep architecting.
date: 2026-05-08
---

I almost turned a memory issue into a distributed-systems project.

The project was a small client prototype with an AI media pipeline. A user uploaded an MP4. In the browser, we loaded FFmpeg through WebAssembly and extracted the audio. The audio went to Deepgram for transcription. The transcript fanned out to six LLM calls through OpenRouter, two prompt variants across three models, and the results came back to the frontend as an AI-assisted analysis.

The pipeline worked. The uncomfortable question was whether it would still work when a second request arrived while the first one was still running.

## The first deploy

We deployed conservatively on Fly with 512 MB of RAM. The pipeline seemed lightweight, the prototype did not need high throughput, and the machine could hibernate between requests. It was dirt cheap.

We were also pre-launch. The product was a prototype for a client, not a public release. Every dollar of complexity I added now was a dollar somebody would pay to maintain later.

## The crash

It crashed at the perfect time: early, under test conditions, before users depended on it. One video was still moving through the pipeline when another request came in, and the machine ran out of memory.

When I dug into the failure, two things were happening at once. The first implementation had avoidable memory duplication. We were holding copies of the transcript longer than necessary, and prompt preparation was being repeated per model call instead of done once and reused. With six fan-out calls, that adds up. The second thing was real concurrency pressure: even after I removed the waste, two overlapping requests would still stack memory in ways the small machine could not absorb.

The bug surfaced exactly when it should have. Bugs in early testing are information, not disasters.

## The architecture I wanted to build

My first instinct was to reach for the architecture I knew we might eventually need.

I started sketching a worker service. The API server would accept the request, persist the upload reference somewhere durable, enqueue the heavy work, and return a job ID. A separate Fly machine would pull from the queue, run the pipeline, write the result back, and shut down. If another request came in, Fly could spin up another worker. The web process would stay lean, the heavy work would move out of request memory, and we would scale by adding workers.

It was a reasonable design. It was also a real system to own.

I started listing what that system would actually require:

- Persistent job state somewhere
- A queue, or a tagged-row pattern in the database
- Idempotency on submission so a refresh did not double-process
- Retries with exponential backoff on transient failures
- A way to surface progress to the frontend (polling or a stream)
- Observability across two machines
- Partial-failure handling when one of the LLM calls timed out
- A way to expire stuck jobs
- Health checks on the worker
- A second deployment unit to debug

Each of those is a small thing. Together they are a system I would be answering questions about for the next year.

## The simpler question

I was talking through this design with my lead when he asked the question I should have asked first.

"What does the boring fix actually cost?"

He meant: what if we just give the machine more memory.

We were running on a 512 MB Fly machine. Moving up to 2 GB was a one-line change in the Fly config. The cost difference for the project was negligible. The machine still hibernated when nothing was happening. The pipeline now had room to absorb overlapping requests instead of falling over.

The fix was a config change. The lesson took longer to learn.

## Why that was the right call

The decision was not "the simple thing won." The decision was a cost comparison.

On one side, a few extra dollars a month for a larger machine. On the other side, a system to own: the queue, the worker, the job table, the retries, the observability, the new deployment unit, the new debugging surface. Pre-launch, the dollar cost of more RAM was rounding error. The complexity cost of a worker service would have shown up every week for the next year.

I would still build the worker service eventually. There is a real version of this app, with a different scale, where the architecture is the right answer. But "eventually" is doing a lot of work in that sentence. The product was not at the eventually stage. It was at the can-we-still-launch-this-quarter stage.

A queue is not just a queue. It is job state, retries, idempotency, observability, partial failure, backpressure, deployment complexity, and new ways for users to get stuck. Those things are all worth building when the product proves it needs them. Building them before launch is one of the easier ways to spend a quarter without learning anything.

## The lesson

Code is not free. The cost of a code solution is not just the time it takes to write. It is the future surface area it creates.

Pre-launch, that future surface area is especially expensive, because the thing you are protecting is your ability to keep learning. Every hour spent maintaining infrastructure is an hour not spent watching a real user touch the product. Every system you have to debug is a system between you and the next thing you need to learn about whether the product should exist in the form you are building it.

Architecture should follow product pressure. At an early stage, the right answer is often to remove waste, buy temporary headroom, and defer the system you know you may eventually need. The machine learns whether it actually needs the architecture. You don't.

## The heuristic I use now

Before I add architecture, I ask:

- Is the current implementation wasting resources I can simply stop wasting?
- What does the boring infrastructure fix actually cost?
- Am I solving a real problem the product is hitting today, or a hypothetical problem I am projecting onto next year?
- Will this architecture help us launch, or delay us from learning?

The answers are not always the same. Sometimes the queue is the right move now. Sometimes a duplicate write actually does need an idempotency layer because the cost of getting it wrong is real money. The point is not to avoid architecture. The point is to make sure the architecture is paying for itself the day you ship it, not the day you imagine you might.

The senior move on this project was not picking the most elegant design. It was changing one line of Fly config and going back to building the product.
