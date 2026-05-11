---
layout: ../../layouts/Post.astro
title: Put the hammer down
description: One swing pre-launch is worth a hundred post-launch.
date: 2026-05-08
---

I almost turned a memory issue into a distributed-systems project.

The project was a small client prototype with an AI media pipeline. A user uploaded an MP4. In the browser, FFmpeg through WebAssembly stripped the audio. The audio went to Deepgram for transcription. The transcript fanned out to six LLM calls through OpenRouter (two prompt variants across three models), and the results came back as an AI-assisted analysis.

My lead suggested starting on Fly at 256 MB. He'd shipped code for tighter constraints than that before, mentioned it offhand, and I trusted him. The pipeline worked. I shipped it.

## The crash

While testing, I sent two requests close together. The machine ran out of memory.

That was the right time for it to happen. Better in a staging session than during a client demo. The crash forced me to actually look at what the pipeline was doing in flight. It was holding duplicate copies of the transcript, rebuilding the same prompt body six separate times for each model call, and stacking concurrent in-flight requests in a way that small VM could not absorb.

My instinct was to reach for the architecture I knew we'd eventually want. A worker service: the API process accepts the request, persists it, enqueues the heavy work. A separate machine pulls from the queue, runs the pipeline, writes the result. Scale by adding workers.

That's a reasonable design. It's also a real system to own: a queue, a job table, retries, idempotency, status streaming, observability across two deployment units. Each of those is small alone. Together they're a year of answering questions about something we hadn't proven users wanted yet.

My lead asked: *what does the boring fix actually cost?*

He meant: what if we just bump the memory.

256 MB to 2 GB was a one-line change in `fly.toml`. The dollar difference for this project was rounding error. The machine still hibernated when idle. The pipeline had room to absorb overlapping requests.

The fix was a config change. The lesson took longer to learn.

## What I take from it

The memory issue was a real problem. It was solvable with code. That doesn't mean code was the right answer that week.

Pre-launch, every engineering hour is scarce in a way it won't be again. One swing pre-launch is worth a hundred post-launch. Not because the post-launch ones are wasted, but because the pre-launch ones are what get you to post-launch at all. A queue and a worker service eventually. Not this week.

The senior move on this project wasn't picking the most elegant design. It was knowing when to put the hammer down.
