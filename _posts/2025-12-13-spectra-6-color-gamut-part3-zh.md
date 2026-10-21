---
layout: post
title: 深入讨论 Spectra 6 的显色技术（Part 3）：更换一种抖动算法，能否提升画质
date: 2026-10-22
lang: zh
ref: spectra-6-color-gamut-part3
permalink: /2026/10/22/spectra-6-color-gamut-part3-zh/
category: tech
tags: [电子纸, Spectra 6, 抖动算法, 误差扩散, 技术]
published: true
---

[上一篇](/2026/10/11/spectra-6-color-gamut-part2-zh/)我们谈到，只要选用一种经典的抖动算法，就可以用 6 种基础色把一张色彩丰富的图片显示出来。

但“能显示”不等于“显示得好”。粗看之下，画面的内容和大致色彩似乎都有了；仔细一看，却会发现里面夹杂着不少噪点，既不够干净，也不太耐看。

## 试试其他抖动算法？

看到这些噪点，很多人的第一反应都是：会不会只是算法没选对？如果换一种抖动算法，画质是不是就能明显提升？

于是，我们自然会尝试其他抖动算法。不同误差扩散算法的核心区别，在于它们怎样把当前像素无法表达的颜色误差，传递给周围尚未处理的像素。

先来看最常见的 Floyd–Steinberg 算法，它的误差扩散矩阵如下：

            X     7/16
    3/16   5/16   1/16

其中，X 表示当前正在处理的像素。当前像素被量化到最接近的基础色之后，剩余的误差会按照矩阵中的比例，传递给右侧和下一行的几个像素。

另外，还有一些电子墨水设备为了追求更快的计算速度，会使用一种“伪 Floyd–Steinberg”算法。它的误差扩散矩阵更小：

     X   3/8
    3/8  2/8
这种算法少了一个方向的误差传递，计算量确实更低，但代价也很明显：画面通常会更加毛躁，方向性的纹理也更容易被看出来。除非设备性能真的非常受限，否则并不建议使用。

### Jarvis、Judice 与 Ninke（JJN）抖动算法

Jarvis、Judice 与 Ninke（JJN）算法把误差扩散到了更大的邻域。它的矩阵如下：

            X    7/48   5/48
    3/48   5/48   7/48   5/48   3/48
    1/48   3/48   5/48   3/48   1/48

这里的 X 同样表示当前像素，其余数字则表示各个相邻像素分到的误差比例。

可以看到，JJN 会把误差分配得更远、更均匀。理论上，这能让颜色和明暗的过渡比 Floyd–Steinberg 更平滑，局部颗粒也不那么集中。不过，需要参与计算的邻居更多，计算量自然也会增加。

### Stucki 抖动算法

Stucki 是另一种常见的误差扩散算法。它的覆盖范围和 JJN 很接近，只是各个方向上的权重略有不同：

            X     8/42    4/42
    2/42   4/42   8/42   4/42   2/42
    1/42   2/42   4/42   2/42   1/42

Stucki 的误差同样会扩散到较大的范围，因此生成的画面往往比 Floyd–Steinberg 平滑。与 JJN 相比，它的画面通常会稍微锐利一些，部分细节可能更加清楚，但计算量仍然明显高于 Floyd–Steinberg。

### Sierra 抖动算法

Sierra 抖动也有多个版本。下面是经典 Sierra 算法的误差扩散矩阵：

            X     5/32    3/32
    2/32   4/32   5/32   4/32   2/32
    1/32   2/32   3/32   2/32   1/32

Sierra 系列还包括 Sierra-2、Sierra-3 等不同版本，可以适应不同的画质和性能要求。整体来看，Sierra 的误差扩散方式介于 JJN、Stucki 与 Floyd–Steinberg 之间，在画面平滑度和运算速度之间做了一个相对均衡的取舍。


所以，无论选择哪一种算法，核心都还是同一件事：怎样重新分配那些无法由基础色直接表达的颜色误差。

误差扩散得更远、更均匀，通常可以让大面积色块和渐变看起来更平滑，降低局部颗粒感；但与此同时，也可能削弱细节，并增加运算量。换句话说，这并不是简单的“扩散范围越大，画质就越好”，而是在平滑度、细节和计算复杂度之间做选择。

## 看看效果


我们还是用[上一篇](/2026/10/11/spectra-6-color-gamut-part2-zh/)中的那张测试图片。换用不同算法之后，可以很明显地看到：每一张图里的点，其分布方式都发生了变化。有的更集中，有的更分散；有的纹理比较锐利，有的过渡看起来更加平滑。

但是，如果继续放大观察，就会发现一个有意思的现象：点的排列虽然变了，画面里的杂色和噪点却没有真正消失。也就是说，算法改变了噪点出现的方式，却没有从根本上解决画面不够干净的问题。

点击下面的图片可以查看原图，并继续放大，方便比较不同结果中点的分布。

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d1.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d1.jpg" width="731" height="1024" alt="同一张测试图的抖动结果一">
  </a>
  <figcaption>抖动结果一</figcaption>
</figure>

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d2.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d2.jpg" width="731" height="1024" alt="同一张测试图的抖动结果二">
  </a>
  <figcaption>抖动结果二</figcaption>
</figure>

<figure class="zoom-figure">
  <a class="zoomable" href="/pics/spectra6/p03-dither-d3.jpg" target="_blank" rel="noopener">
    <img src="/pics/spectra6/p03-dither-d3.jpg" width="731" height="1024" alt="同一张测试图的抖动结果三">
  </a>
  <figcaption>抖动结果三</figcaption>
</figure>


这也说明，问题可能不只是“误差应该往哪里传”。对于只有 6 种基础色的 Spectra 6 来说，如果目标颜色本身就无法由这 6 种颜色很好地表达，那么无论怎样重新安排像素，都只是在换一种方式分配误差。

下一篇我们将继续追问：那么在抖动算法之外，我们还能做哪些尝试？

---

*本文根据陈锐博士在第五届电子纸产业生态发展大会（ePSD2026）上的演讲《深挖电子纸色彩上限——Spectra6渲染机制与AI增强路径》[整理并扩充](https://www.epaperia.com/News/1713.html)。*
