---
layout: post
title: What Makes Full-Color ePaper Look “Good”?
date: 2026-09-25
lang: en
ref: iote-color-epaper-rendering-workshop
permalink: /2026/09/25/iote-color-epaper-rendering-workshop/
category: tech
tags: [ePaper, Spectra 6, Workshop, IOTE, image rendering, technology]
---
## Background

On August 26, 2026, during IOTE 2026 and the 4th ePaper Innovation Application Conference (ePIC 2026), I hosted a workshop on color rendering for full-color ePaper, especially Spectra 6 (E6 for short): “Color ePaper Image Quality Rendering Workshop.”

Three guests from different parts of the chain joined the discussion. Zheng Hanyao has long worked on low-level ePaper driving and open-source controllers. Liu Bo represented the M5Stack developer hardware ecosystem. Fang Jijun came from the system-solution side, with experience in medium and large E6 products and commercial delivery.

![IOTE 2026 full-color ePaper image rendering workshop](/pics/workshop/iote-workshop-scene.jpg)
*The workshop at the ePaper Industry Alliance salon area during IOTE 2026.*

## From Displaying to Looking Good

Full-color ePaper represented by E6 has already been used in many scenarios over the past two years. At the workshop, the guests first looked back on their own experience with E6. The first impression was actually similar: E6 looks impressive at first sight, and getting the first image on screen is not especially hard. But soon you realize that many images do not look as good as expected.

After that, the work starts to diverge. Some people focus more on low-level driving and waveforms. Some care more about whether developers can use the hardware easily. Others care about whether customers in real commercial projects will accept the final result.

This is also something I have felt strongly when building products: discussing one dithering algorithm alone cannot solve everything. Real image rendering is a whole chain, from screen characteristics, content understanding, gamut mapping, error diffusion, and visual preference to the final product experience.

## One Image, Two Choices

Then we moved into a fun part of the workshop. We prepared two images and asked the audience to choose. In the figure below, the left and right images are two E6 renderings, and the center is the original. At the time, the audience only saw the left and right images first.

![Method A, original, and method B](/pics/workshop/doll-compare.jpg)
*Left: method A. Center: original. Right: method B.*

Most guests and audience members chose method A, while a few chose method B.

We asked both sides why. Those who supported A mainly felt that it had clearer tonal separation and more visible detail.

Those who chose B simply preferred the more saturated colors.

## What Should We Preserve When a Color Cannot Be Shown?

Then we showed the original image in the center. It was deliberately chosen because it exceeds what E6 can reproduce. E6 does not have that highly saturated magenta.

At this point, would people still prefer method A, or method B?

In fact, method A (InkJoy ISFR) was designed to preserve hue and tonal separation as much as possible. Method B pushes colors that cannot be shown toward a purer, more saturated result.

## One Method Cannot Handle Every Image

One guest pointed out: this is a photo of a doll. If it were a different subject, would fewer people choose an oversaturated style like B?

The type of image strongly affects how people judge display quality. Portraits, pets, commercial ads, and illustrations each need a different treatment. Expanding that capability is something ISFR has been working on.

I would add another point: how familiar people are with an image also strongly affects their judgment. In both internal and external tests, people are less able to tell rendering differences apart when the image is unfamiliar. When they look at photos they know well—daily life, or pictures they took themselves—their judgment becomes much sharper.

> One interesting case: when InkJoy Frame first shipped, a customer publicly said, “Your colors are not as good as other frames.” Honestly, that hurt. But less than a month later, the same customer wanted to buy four more units. When we asked why, he said that when he first received the frame, he had randomly found some very vivid images online for testing. After a month of showing his own life photos, he realized InkJoy Frame made those photos look more real and natural.

For advertising images, once the visual information is conveyed accurately, adding a bit more visual impact may be the smarter choice. A guest also pointed out that accurate communication should include protecting a brand’s signature colors.

So one method cannot solve every image. A real rendering system should understand both content type and usage scenario. Test images matter, but if an algorithm only works on test images, real content will quickly break it.

## From “Can Display” to “Looks Good”

This workshop did not provide a standard answer.

Full-color ePaper is no longer a lab demo. It is appearing in photo frames, signage, open-source hardware, and many industry terminals. In the next few years, competition will increasingly focus on “looking good”: how colors are mapped, how images are accepted, whether different content needs different strategies, and who can put those strategies into stable real products.

That, to me, is where "looking good" really becomes valuable. Even on a display with a limited and discrete gamut, image understanding, color mapping, and product-level tuning can still create images that people find "good" to look at.

<div style="color:#777;font-size:13px;font-style:italic;line-height:1.7;">
<p style="margin:0 0 0.8em;"><strong>Host and Guests</strong></p>
<p style="margin:0 0 0.8em;"><strong>Host: Ray Chen</strong><br>
PhD from the Institute of Microelectronics, Chinese Academy of Sciences. Co-founder and former CTO of DASUNG, where he led development of the world’s first e-ink monitor. Since founding Mozhen Technology, he has focused on E6 color algorithms and their use in photo-frame products. InkJoy Frame was well received on Kickstarter and at CES. He was invited to the 5th ePaper Industry Ecosystem Development Conference (ePSD 2026) and gave a talk titled “Pushing the Color Limits of ePaper: Spectra 6 Rendering and AI Enhancement.”</p>
<p style="margin:0 0 0.8em;"><strong>Zheng Hanyao</strong><br>
Independent developer and author of the open-source project Zynq7010_eink_controller. His work focuses on low-level ePaper driving, FPGA image processing, parallel-interface ePaper timing control, and timing control, color rendering, and correction algorithms for E Ink Spectra 6.</p>
<p style="margin:0 0 0.8em;"><strong>Liu Bo</strong><br>
Software platform lead at M5Stack and an active member of the maker and developer community. M5Stack’s PaperColor brought full-color ePaper into the familiar ESP32 ecosystem and modular hardware workflow for more developers.</p>
<p style="margin:0;"><strong>Fang Jijun</strong><br>
Founder of Shenzhen Jinyatai Technology. Jinyatai has long worked on ePaper system solutions, covering photo frames, signage, writing tablets, station signs, and other medium and large full-color ePaper products, with system delivery capabilities including FPGA TCON.</p>
</div>
