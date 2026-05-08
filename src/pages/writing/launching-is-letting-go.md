---
layout: ../../layouts/Post.astro
title: Launching is letting go
description: A memory bug, a worker service I almost built, and one line of Fly config. On the kind of problem where the boring answer is the senior one.
date: 2026-05-08
---

I almost turned a memory issue into a distributed-systems project.

The project was a small client prototype with an AI media pipeline. A user uploaded an MP4. In the browser, FFmpeg through WebAssembly stripped the audio out. The audio went to Deepgram for transcription. The transcript fanned out to six LLM calls through OpenRouter — two prompt variants across three models — and the results came back to the frontend as an AI-assisted analysis.

The pipeline worked. The uncomfortable question was whether it would still work when a second request arrived while the first one was still running.

## The first deploy

We deployed conservatively on Fly. There was a spec sheet of what the prototype was supposed to need: lightweight, low throughput, hibernate-between-requests. So I picked the smallest VM Fly offered, 256 MB of RAM, and called it done. It was dirt cheap.

Dirt cheap mattered. This was a prototype for a client we hadn't signed a contract with yet. It wasn't even clear the product would get funded. Every dollar of complexity I added now was a dollar somebody might never get to pay back. Pre-launch, the cost of a piece of infrastructure isn't the bill — it's whether anyone is around in six months to keep it running.

In hindsight, 256 MB was undersized. I'll come back to that. The honest version of the story is that a mistake like that mattered a lot less than my attitude toward fixing it.

## The crash

It crashed at the right time — early, under test conditions, before users depended on it. One video was still moving through the pipeline when another request came in, and the machine ran out of memory.

My lead has always taught me to fail fast, and I count that crash as a real success of the dev process. I'd much rather find a memory ceiling on a Tuesday afternoon staging deploy than during a client demo.

## Peeling back layers

I dug into the failure expecting one cause and found three.

The first layer: Claude had been lazy. I'd asked it to strip the audio out of the MP4 with FFmpeg before upload, and somewhere along the way that work hadn't actually been wired up. Reading the file the way it actually existed in the repo — and walking the commit history — made it obvious. The implementation in the code was not the implementation in my head. Once that was fixed, the pipeline was moving audio, not video.

The second layer was just gross. The LLM fan-out was holding copies of the transcript longer than it needed to, and it was rebuilding the entire request body — system prompt, user prompt, model name, JSON envelope — six separate times, instead of pre-serializing the two messages once and slotting them into per-model bodies. With six calls running in parallel, that adds up.

The third layer is the one that finally surfaced the actual problem. Even after I cleaned up the duplication, the math didn't fit on a 256 MB machine. Two overlapping requests would still stack memory in ways that small VM couldn't absorb. That's when I went and measured how big the in-flight payloads actually were, and looked at the RAM cap I'd handed myself in fly.toml.

## The architecture I wanted to build

My first instinct was to reach for the architecture I knew we might eventually need.

I started sketching a worker service. The API server would accept the request, persist the upload reference somewhere durable, enqueue the heavy work, and return a job ID. A separate Fly machine would pull from the queue, run the pipeline, write the result back, and shut down. If another request came in, Fly could spin up another worker. The web process would stay lean, the heavy work would move out of request memory, and we would scale by adding workers.

It was a reasonable design. It was also a real system to own:

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

Each of those is a small thing on its own. Together they're a system I'd be answering questions about for the next year.

## The simpler question

I took the problem to my lead. I had one real proposal — the worker service — and I walked him through that for a while. Then I ran out of confident ideas and started spitballing: ways to persist the in-flight memory off-process and leave a reference behind, maybe push it through a queue. He listened, sat with it for a moment, and hit me with the classic.

"What if we just bump it to 2 GB?"

Not the worker service. Not any of the spitballing. A different question entirely.

I was spitballing in the first place because I'd never actually had this problem before. Most code I write runs on machines with so much RAM headroom nobody thinks about it. If I'd tried to actually build any of the off-process ideas, my next step would have been Googling how it's done — I don't know offhand. Who codes for a 256 MB machine?

The other reason I never considered just bumping the VM was that I didn't know what it would cost. Memory is not cheap right now, and the instinct to first ask "can I be smarter with what I have?" before reaching for more of it isn't, on its own, a bad one. But I also hadn't actually checked. When I did, the answer was rounding error — a few extra dollars a month for a machine that already hibernated when nothing was happening. The pipeline now had room to absorb overlapping requests instead of falling over.

The fix was a one-line change in fly.toml. The lesson took longer to learn.

## What I was actually solving for

My problem on this project was that all I was holding was a hammer. I wanted to solve an infrastructure problem with software, because software is what I know how to write. Adding 1.75 GB of RAM didn't feel like solving the problem. Designing a worker service did. That instinct was wrong, and figuring out why it was wrong is most of what I took away from this.

I take it a little personally that software has gotten worse and worse at memory management. I think it's a tell of inelegant software. But I also think it's a tell of software for the real world. The hours I'd spend tightening allocations are hours I'm not spending watching a real user touch the product, which is the only thing that tells me whether the product should exist in the form I'm building it. Users are not going to notice the size of the Fly machine. They're going to notice whether the product exists when they need it, whether it's any good when it does, and whether anybody told them about it. Those are the real problems and they all sit downstream of launching.

The Y Combinator line I keep coming back to: if you're not at least a little embarrassed by your launch, you launched too late. And the corollary — if you can pay a single cent to free up dev time between you and launching, just pay it. More RAM is dollars. A worker service is dev time and forever-after maintenance. Pre-launch, those are not even on the same order of magnitude.

I want to spend my "interesting software" budget on the parts of the system that actually got us to a launch. Not on the architecture I might need a year from now if a launch ever happens.

## Launching is letting go

A queue isn't just a queue. It's job state, retries, idempotency, observability, partial failure, backpressure, deployment complexity, and new ways for users to get stuck. Those things are all worth building when the product proves it needs them. Building them before launch is one of the easier ways to spend a quarter without learning anything.

Architecture should follow product pressure. Pre-launch, the right move is often to fix the waste you can clearly see, buy temporary headroom, and defer the system you know you may eventually need. The machine learns whether it actually needs the architecture. You don't.

Before I add architecture now, I ask myself four things:

- Is the current implementation wasting resources I can simply stop wasting?
- What does the boring infrastructure fix actually cost?
- Am I solving a real problem the product is hitting today, or a hypothetical problem I'm projecting onto next year?
- Will this architecture help us launch, or delay us from learning?

The answers aren't always the same. Sometimes the queue is the right move now. Sometimes a duplicate write actually does need an idempotency layer because the cost of getting it wrong is real money. The point isn't to avoid architecture. The point is to make sure the architecture is paying for itself the day you ship it, not the day you imagine you might.

The senior move on this project wasn't picking the most elegant design. It was changing one line of fly.toml and going back to building the product.
