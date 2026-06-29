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

My lead is a big proponent of failing fast, but this was failing faster than I'd intended. I'd tested with an MP4 of my own, but it was just a black screen, and nothing had flagged. On a real input, the machine ran out of memory and crashed.

Digging in, my hasty analysis of the implementation had been far too trusting of Claude. Several things had to change: The client-side FFmpeg step was in the project but never wired up, so the server received the entire MP4 instead of the extracted M4A audio. The server then buffered the whole file into memory instead of streaming it to Deepgram, and an erroneous copy doubled the footprint. The model fan-out rebuilt the entire request payload for all six calls, instead of serializing the two prompts once and reusing each across the three models.

My lead had been right about the amount of memory the machine needed for the prototype, but the project was moving to a pilot stage quickly, and I had not considered what specs we would need for concurrent requests with our current architecture.

I identified that this pipeline would make a great microservice, and I was excited to try out Fly.io's autoscaling. I got to work sketching the edge cases, but I caught myself: I was building for a pilot, not a product launch. So I came up with a quick and dirty solution that would at least account for concurrent requests: a queue held in memory that referenced the location of the files we'd be streaming to disk.

I brought these to my lead early on. He just looked at the application, navigated to Fly's pricing page, and said it was negligible to just increase the memory. He quoted Paul Graham's ["do things that don't scale,"](https://paulgraham.com/ds.html) applied to spend: it's not just that you get to buy time with the money, but that you also get to buy more certainty by not adding more code.

I had not considered that the solution would lie in the config file.

## What I take from it

When I've been solving software problems with code all day, it's easy to see another problem as another nail that needs to be hammered. At Avodah, they have been teaching me to zoom out and assess problems in the context of the project's current needs, with every tool in the belt available.

Before launch, some nails actually need to be pried out with the claw end. Sometimes when I see a code solution to a software problem, the answer is to flip the hammer over and close my IDE.
