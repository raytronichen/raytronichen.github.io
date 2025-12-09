---
layout: post
title: A Deep Dive into Spectra 6 Color Rendering (Part 1)
date: 2025-11-26
lang: en
ref: spectra-6-color-gamut-part1
permalink: /2025/11/26/spectra-6-color-gamut-part1/
category: tech
tags: [E-ink, Spectra 6, color gamut, color reproduction, technology]
---

What exactly can E Ink Spectra™ 6 (E6) do in terms of color?

On its official site, E Ink says E6 has six base colors (black, white, red, yellow, blue, green) and can deliver Vivid Full Color.
However, many vendors market E6 as supporting 65,000 colors, and some even claim millions of colors.
![InkJoy compare to CMYK](/pics/cie/20251209-154041.jpg)
Are these claims trustworthy? **I don’t buy it.**

## E6’s color gamut is limited and discrete

E Ink Spectra 6 is built on a six-particle system: black, white, red, yellow, blue, green.

### Limited
Many promos boost screen colors in post, or even Photoshop an image onto the frame.
In reality, as a reflective display, E6 is far from the vividness of LCD/OLED (here I’ll call LCD/LED/OLED simply “LCD”). As practitioners, we should face this instead of trying to gloss over it.
In the Lab color space, when we project all colors onto the ab plane, E6’s color points (blue connected dots) are quite limited compared with sRGB. But the gap versus CMYK is smaller.
![InkJoy compare to CMYK](/pics/lab-E6.jpg)

Here’s what the real-world effect looks like:
![InkJoy compare to print](/pics/c_w_print.jpg)
Left: inkjet printer; middle: InkJoy with E6; right: glossy photo paper

### Discrete

Each LCD pixel can be seen as three RGB subpixels, each channel with 8–10 bits, which means each pixel has 256*256*256 = 16,777,216 colors. Each printer dot (also a pixel) can have four (or more) CMYK channels, stacking different droplet sizes. But with E6, **each pixel can only show one of the six base colors**.
So if you judge it by LCD or printer capabilities, E6 effectively has **just 6 colors**!

## Can dithering add colors?
With halftoning, you can use relatively few colors to mimic more. On LCDs this is common—for example, using temporal dithering to get 10-bit from 8-bit. In marketing, “16.7 million colors” becomes “1 billion colors.”
So how many colors does E6 get via dithering? If you count simulated colors, you could also claim 16.7 million—but that’s meaningless.
If that logic held, every monochrome ePaper could claim it has 256 levels of gray or even more.

## Where does “65,000 colors” come from?

I couldn’t find the source on E Ink’s site, and E Ink staff couldn’t answer either.
In a 2022 E Ink article (https://spectrum.ieee.org/how-e-ink-developed-full-color-epaper) about ACeP, it states:
“By stopping the particles at different levels, we can use these particles to create up to 50,000 colors.” (Thanks to APOV for the lead.)

In practice, this “particles stop at multiple levels to show different grayscale” ePaper technology hasn’t been mass-produced. Perhaps because E6 also has four particle types, some people mistakenly believe each supports 16 gray levels and can fully mix, hence 16*16*16*16 = 65,536.

**I first saw the “millions of colors” claim in a Samsung piece.**

Samsung used ordered dithering to simulate colors. First you assign each base color a weight of 0–1 for the target color. That weight is the probability of that color appearing within a set of pixels. Then you generate a dithered image using blue noise or other ordered dithering to approximate the color as closely as possible.

According to Samsung’s marketing, you can get about 2.5 million colors. That requires at least 176 probability levels to represent a range. So you need at least a 14*14 = 196-pixel region to independently represent a single color. By the same logic, if we use a 20*20 = 400-pixel region, the probability steps increase, and by combining them you can easily claim “hundreds of millions” of colors.

##
In the next part of this series, we’ll explore how these limits affect real image rendering and which techniques can address these problems.

