---
layout: ../../layouts/Post.astro
title: Flip the hammer over
description: How I learned to write as little software as possible.
date: 2026-05-08
softwareChat: true
---

My job is primarily solving problems with software solutions, but this problem prompted my lead to tell me to close my IDE.

The project was a small client prototype with an AI media pipeline: a user uploaded an MP4, FFmpeg.wasm stripped the audio in the browser, Deepgram transcribed it, and the transcript fanned out to six LLM calls through OpenRouter, returning an AI-assisted analysis.

I set up the Fly.io machine using my lead's suggestions on what to provision to start, ran the basic math to confirm the specs made sense, and tested it. Nothing flagged, and we were well within the resources I'd expected to need, so I moved on with the prototype.

## The crash

My lead is a big proponent of failing fast, and this was failing faster than I'd intended. I'd tested with an MP4 of my own, but it was just a black screen, and nothing had flagged. The crash came from a real input: the client sent a full-length MP4 with actual video, and the machine ran out of memory.

Digging in, I found that Claude had not implemented the spec I'd laid out, and my quick pass over the code hadn't caught how far off-spec it had drifted. Several things had to change: The client-side FFmpeg step was in the project but never wired up, so the server received the entire MP4 instead of the extracted M4A audio. The server then buffered the whole file into memory instead of streaming it to Deepgram, and an erroneous copy doubled the footprint. The model fan-out rebuilt the entire request payload for all six calls, instead of serializing the two prompts once and reusing each across the three models. I had assumed that running FFmpeg would mean it didn't matter what the MP4 was doing. I was clear in the spec, and it's outside my experience with Claude that it would take a shortcut like that, but the fault is mine for not checking.

My lead had been right about the amount of memory the machine needed for the prototype, but it was moving to a pilot test quickly, and I had not considered what specs we would need for concurrent requests at our current architecture. Two requests arriving close together would each hold a full payload, and I hadn't realized how tight the margins on the machine's memory really were.

I was excited to try out microservices with Fly. But sketching out the edge cases, I caught myself. We didn't need to immediately jump to a microservice architecture; I could probably do a quick and dirty solution for now. I was concocting a kind of queue held in memory that referenced database files, and I was patting myself on the back a bit for having cut off potential scope creep with a realistic solution.

That's when my lead just looked at the Fly.io pricing page for a second and navigated to the cost to run. Not only was it negligible to just upgrade the memory, he quoted a Y Combinator partner who says that during your launch period you are willing to do inefficient things to defer problems — the more problems a little money can solve, the more time you buy, and pre-launch that's a trade worth making.

Increasing the memory was a one-line change in `fly.toml`. The machine still hibernated when idle, and the pipeline finally had room to absorb overlapping requests.

I had never considered not writing code to solve that problem, seeing as I saw obvious code solutions.

The fix was a config change. The lesson took longer to learn.

## What I take from it

My job is to hammer nails all day: I see problems that can be solved with software, and I solve them with software. At Avoda, I am given the full tool belt, and they have been teaching me to, before I take a swing, look at what's available to me and what makes sense with the goals of the project in mind and the tools I have available.

Before a launch, every swing of the hammer is expensive, because each one stands between you and launching. We will likely need that microservice architecture after launch. Until then, the move is to flip the hammer over: take the fix that does not require a swing, and leave the building for when the product has earned it.
