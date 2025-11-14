---
layout: post
title: The Color Limitations of Spectra 6 — A Reddit Discussion
date: 2025-11-13
lang: en
ref: spectra-6-color-limitations
permalink: /2025/11/13/spectra-6-color-limitations/
tags: [E-ink, Spectra 6, color, photography, Reddit]
---

Someone on Reddit asked me a question:

> I love e-ink tech, and I'm excited to see what it can do in the future. For now, I want to know about how realistically we can make photos display on E-ink. Obviously resolution is not really an issue, but the color rendition side of things are. Are there limits to our current Spectra 6 color model that prevent certain colors from showing?
>
> I'm looking forward to a screen that renders photos properly life-like, rather than an artistic style.

---

My answer:

**Photos can display very well—take a look at my cat!**
![Cat](/pics/ash_cat.png)

**Limited and Discrete Color Gamut**

At the same time, your concern is valid. E Ink Spectra 6 (abbreviated as E6) does have color limitations. While E6 claims to display six colors—black, white, red, yellow, blue, and green—these are not ideal values for these colors. If we consider the ideal red RGB value to be (255, 0, 0), E6's red might only be (180, 40, 30). It is not only dim but also impure (both brightness and saturation are insufficient). Moreover, each pixel can only display one color, so E6's entire color gamut is discrete and limited (I don't know who first claimed that E6 can display 65,000 colors, and some manufacturers even claim millions of colors—I consider such claims irresponsible).

These physical limitations lead to two problems:
1. For high-luminance, high-brightness colors (especially magenta and cyan that meet both conditions), these cannot be fully covered by the existing color particles. Here, we can only use approximate colors as substitutes. Fortunately, these colors are uncommon in nature, so their impact on photos is minimal.
2. Color tolerance is very limited, which has a significant impact on photos.

Without appropriate algorithms, this can lead to issues such as underexposure, overexposure, or oversaturation. These phenomena are much more severe in realistic photos, especially portraits.

**Portrait Comparison**

This is a real portrait photo without professional lighting setup.
The commonly used driver + algorithm solution in the industry produces very poor results (top)
The image effects processed by our ISFR™ engine can better preserve the details of the image (bottom)
![ISFR compare](/pics/compare.jpg)
*The photo was taken at close distance, so you can see the pixels*

