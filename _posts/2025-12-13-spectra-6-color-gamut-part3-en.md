---
layout: post
title: "A Deep Dive into Spectra 6 Color Rendering (Part 3): Can Switching Dithering Algorithms Improve Image Quality?"
date: 2026-10-22
lang: en
ref: spectra-6-color-gamut-part3
permalink: /2026/10/22/spectra-6-color-gamut-part3/
category: tech
tags: [ePaper, Spectra 6, dithering algorithms, error diffusion, technology]
published: true
---

In the [previous article](/2026/10/11/spectra-6-color-gamut-part2/), we saw that a classic dithering algorithm can use just six base colors to display an image containing a much wider range of colors.

But being able to display an image is not the same as displaying it well. At a glance, the content and general colors may seem to be there. Look more closely, however, and the image contains a considerable amount of noise. It does not look clean, and it is not particularly pleasant to view over time.

## What If We Try a Different Dithering Algorithm?

When people see this noise, their first reaction is often: perhaps we simply chose the wrong algorithm. If we switch to a different dithering algorithm, will the image quality improve significantly?

Naturally, the next step is to try other algorithms. The main difference among error-diffusion algorithms is how they distribute the color error that the current pixel cannot represent to neighboring pixels that have not yet been processed.

Let us begin with the most familiar example, Floyd–Steinberg. Its error-diffusion matrix is:

            X     7/16
    3/16   5/16   1/16

Here, X represents the pixel currently being processed. After that pixel is quantized to the nearest base color, the remaining error is distributed to pixels on its right and in the following row according to the weights in the matrix.

Some ePaper devices also use a “pseudo Floyd–Steinberg” algorithm in pursuit of faster processing. Its error-diffusion matrix is smaller:

     X   3/8
    3/8  2/8

Because this version omits error propagation in one direction, it does require less computation. The trade-off, however, is quite visible: the image usually looks rougher, and directional patterns are more likely to appear. Unless the device is extremely constrained, this approach is not recommended.

### Jarvis, Judice, and Ninke (JJN) Dithering

The Jarvis, Judice, and Ninke (JJN) algorithm diffuses error across a larger neighborhood. Its matrix is:

            X    7/48   5/48
    3/48   5/48   7/48   5/48   3/48
    1/48   3/48   5/48   3/48   1/48

Here again, X represents the current pixel, while the other numbers specify the share of error passed to each neighboring pixel.

As we can see, JJN spreads the error farther and more evenly. In theory, this produces smoother color and tonal transitions than Floyd–Steinberg and makes local grain less concentrated. More neighboring pixels must be processed, however, so the computational cost also increases.

### Stucki Dithering

Stucki is another widely used error-diffusion algorithm. Its coverage is similar to JJN, but the weights assigned in each direction are slightly different:

            X     8/42    4/42
    2/42   4/42   8/42   4/42   2/42
    1/42   2/42   4/42   2/42   1/42

Stucki also spreads error across a relatively large area, so its output often looks smoother than Floyd–Steinberg. Compared with JJN, it generally appears slightly sharper and may preserve some details more clearly, although its computational cost remains substantially higher than that of Floyd–Steinberg.

### Sierra Dithering

Sierra dithering comes in several variants. The error-diffusion matrix for the classic Sierra algorithm is:

            X     5/32    3/32
    2/32   4/32   5/32   4/32   2/32
    1/32   2/32   3/32   2/32   1/32

The Sierra family also includes variants such as Sierra-2 and Sierra-3, which suit different image-quality and performance requirements. Broadly speaking, Sierra falls between JJN or Stucki and Floyd–Steinberg, offering a relatively balanced compromise between smooth output and processing speed.

Regardless of which algorithm we choose, the underlying task remains the same: redistributing color errors that cannot be represented directly by the available base colors.

Spreading those errors farther and more evenly can make large color areas and gradients look smoother while reducing localized grain. At the same time, it may soften fine detail and require more computation. In other words, a wider diffusion range does not automatically produce better image quality. It is a trade-off among smoothness, detail, and computational complexity.

## Let Us Look at the Results

We will use the same test image from the [previous article](/2026/10/11/spectra-6-color-gamut-part2/). After switching algorithms, the change in dot distribution is easy to see. Some results are more clustered, while others are more dispersed; some patterns look sharper, while others produce smoother transitions.

But if we zoom in, we notice something interesting: although the arrangement of the dots has changed, the unwanted colors and noise have not truly disappeared. The algorithm changes how the noise appears, but it does not fundamentally solve the problem of an image that looks unclean.

Click any image below to view it at full resolution and zoom in further to compare the dot patterns.

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d1.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d1.jpg" width="731" height="1024" alt="First dithering result for the same test image">
  </a>
  <figcaption>Dithering result 1</figcaption>
</figure>

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d2.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d2.jpg" width="731" height="1024" alt="Second dithering result for the same test image">
  </a>
  <figcaption>Dithering result 2</figcaption>
</figure>

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d3.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d3.jpg" width="731" height="1024" alt="Third dithering result for the same test image">
  </a>
  <figcaption>Dithering result 3</figcaption>
</figure>

This tells us that the problem may involve more than simply deciding where the error should go. Spectra 6 has only six base colors. If those six colors cannot adequately represent the target color in the first place, rearranging the pixels merely redistributes the error in a different way.

In the next article, we will ask a new question: beyond changing the dithering algorithm, what else can we try?

---

*This article is adapted and expanded from Dr. Chen Rui’s ePSD 2026 presentation, [“Unlocking the Full Color Potential of ePaper: Spectra 6 Rendering Mechanism and AI Enhancement Path.”](https://www.epaperia.org/News/2673.html)*
