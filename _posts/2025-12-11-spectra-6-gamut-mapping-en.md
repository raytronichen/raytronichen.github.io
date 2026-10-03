---
layout: post
title: Dithering Alone Is Not Enough
date: 2025-12-11
lang: en
ref: spectra-6-gamut-mapping
permalink: /2025/12/11/spectra-6-gamut-mapping/
category: tech
tags: [E-ink, Spectra 6, color gamut, gamut mapping, technology]
---

On E Ink Spectra™ 6 (E6), each pixel can display only one of black, white, red, yellow, blue, or green. Richer color therefore depends on a dithering algorithm.

## An Example of Algorithmic Tradeoffs

A small but interesting question: how should pure green be shown?

- Option A: Use E6’s native green (a dark ink green) to stand for pure green.
- Option B: Use a combination of green and yellow to stand for pure green.



The algorithms people argue about most often are Floyd–Steinberg, Stucki, JJN, and others. Which one is better is a frequent point of dispute. Some also tweak the base color values inside a demo project, trying to make the picture “more saturated.”
![E6 with ideal-color dithering (CIE 1931)](/pics/cie/basic.png)
![E6 with virtual-color dithering (CIE 1931)](/pics/cie/vit.jpg)

Seen on the CIE 1931 diagram, both approaches have clear shortcomings. The first tends to introduce stray colors, so the image is not clean. The second breaks up tonal steps: contrast is high, but detail is lost.


---

## Why Gamut Mapping Is Needed

The colors E6 can display are extremely limited. No matter which algorithm you use, and no matter how you assign values to the six base colors, the final result is decided by the physics of the panel. Mapping the full color range into what the screen can actually show, and only then dithering, is an approach whose result you can control.

E Ink has described a similar step at trade shows. The horseshoe-diagram rendering from E Ink’s official tool also looks better than the simple operations above. One caveat: the colors in the official tool do not reproduce the panel’s real color values. What we look at is the result after those colors have been mapped onto the screen’s actual appearance.

After image recognition and enhancement, one of ISFR’s core steps is gamut mapping. We studied E6’s display gamut in depth and map sRGB into E6’s discrete gamut.
ISFR aims for a better picture and consistent tone, not merely uniform parameters or an exact match on pure colors. There is no perfect gamut-mapping algorithm. E6’s gamut is limited and discrete, and different design choices produce very different impressions.

## An Example of Algorithmic Tradeoffs

A small but interesting question: how should pure green be shown?

- Option A: Use E6’s native green (a dark ink green) to stand for pure green.
- Option B: Use a combination of green and yellow to stand for pure green.

ISFR chooses option B, for better gradation and smoother transitions.

Because the gamut is under precise control, we can also offer artists an accurate palette mode.

## Thinking About the Color Goal

Among color difference, chromaticity, and luminance, which one should be protected first? There is no single right answer. E6’s discrete gamut forces a tradeoff among cleanliness, gradation, and saturation. Gamut mapping is how we look for the balance that fits the scene.
