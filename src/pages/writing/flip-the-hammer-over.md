---
layout: ../../layouts/Post.astro
title: Flip the hammer over
description: How I learned to write as little software as possible.
date: 2026-05-08
---

My job is primarily solving problems with software solutions, but one problem prompted my lead to tell me to close my IDE.

The project was a small client prototype with an AI media pipeline: a user uploaded an MP4, FFmpeg stripped the audio in the browser through WebAssembly, Deepgram transcribed it, and the transcript fanned out to six LLM calls through OpenRouter, returning an AI-assisted analysis.

I set up the Fly machine using my lead's suggestions on what to provision to start, ran the basic math to confirm the specs made sense, and tested it. Nothing flagged, and we were well within the resources I'd expected to need, so I moved on with the prototype.

## The crash

The crash came at the perfect time. My lead is a big proponent of failing fast, and this was failing faster than I'd intended. I'd tested with my own data and nothing had flagged. But the crash came from a real input: the client sent a demo file with an actual video attached, and the machine ran out of memory.

Claude had not implemented the spec I'd laid out, and my quick pass over the code hadn't caught how far it had drifted. It worked on my test MP4, which was much smaller, so nothing surfaced until a real file hit it. Several things had to change. The client-side FFmpeg step was in the project but never wired up, so the server received the entire MP4 instead of a stripped-down MP3. The server then buffered that whole file into memory instead of streaming it to Deepgram, and a second copy doubled the footprint. The model fan-out rebuilt the entire request payload for all six calls, instead of serializing the two prompts once and reusing each across the three models. I fixed each of these in code.

My lead had been right about how much memory the machine needed. What we didn't have was any strategy for concurrent requests. This was a simple proof-of-concept pipeline, and I'd been trusting his sizing without thinking through what actually needed to be held in memory, or when. Two requests arriving close together would each hold a full payload, and I hadn't realized how tight the margins on the machine's memory really were.

As the prototype started moving out of proof-of-concept, I began thinking about how to handle concurrency so the machine wouldn't crash if two requests ever ran at once.

I was excited about the microservice. It is an architecture I have been wanting to cut my teeth on, and Fly would make it easy to keep the app scalable: the API process stays lean, a separate worker pulls jobs off a queue and runs the pipeline, and you scale by adding workers.

As an interim measure, I also looked at leaning on persistence: streaming the transcript into the database and holding it there until it was time to queue it for processing. Streaming to the database keeps memory low. It would have been a stopgap rather than an established pattern, probably unestablished for good reason. It would likely work, with some dumb edge cases, like a user effectively waiting in line just to upload. And even with streaming, there is a ceiling on how many uploads can run at once. I figured around four concurrent would be a reasonable max for a temporary fix.

My lead listened to both proposals. Then he asked, "What if we just bumped the memory up?"

He showed me how little it costs to keep 2 GB reserved on Fly. He had context I didn't: the infrastructure budget, and how far down in the noise this number really was. A bigger machine was a rounding error, and it bought something the code changes could not, which was zero development risk.

256 MB to 2 GB was a one-line change in `fly.toml`. The machine still hibernated when idle, and the pipeline finally had room to absorb overlapping requests.

The microservice I had been excited about was a different order of cost. A queue, a job table, retries, idempotency, status streaming, observability across two deployment units. Each of those is small alone. Together they are a year of answering questions about something we had not yet proven users wanted.

The fix was a config change. The lesson took longer to learn.

## What I take from it

My job is to hammer nails all day, applying software solutions to problems. When I see a nail, my instinct is to take another swing. But sometimes the move is to flip the hammer over and pull the nail out with the claw end. I had been trying to build software solutions, when my job is really just to build solutions, and software is usually the route that makes the most sense.

Before a launch, every swing of the hammer is expensive, because each one stands between you and launching. We will likely need that microservice architecture after launch. Until then, the move is to flip the hammer over: take the fix that does not require a swing, and leave the building for when the product has earned it.

The correct solution wasn't to pick the right software pattern, it was to take a look at my toolbelt.
