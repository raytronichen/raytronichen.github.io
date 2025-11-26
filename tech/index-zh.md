---
layout: default
lang: zh
category: tech
permalink: /tech/zh/
---

<div class="home">
  <div class="hero">
    <p class="intro-text">
      技术见解和技术讨论<br>
      探索电子纸显示技术的深度<br>
      从 Spectra™ 6 到色彩校准算法。
    </p>
    <img src="/pics/main.jpeg" alt="电子纸技术" class="intro-image">
  </div>

  <div class="posts">
    <h2 class="posts-title">最新技术文章</h2>
    <ul class="post-list">
      {% assign filtered_posts = site.posts | where: "lang", "zh" | where: "category", "tech" | sort: "date" | reverse %}
      {% for post in filtered_posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%Y年%m月%d日" }}</span>
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        {% if post.excerpt %}
        <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        {% endif %}
        {% if post.tags %}
        <div class="post-tags">
          {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </li>
      {% endfor %}
    </ul>
  </div>

  {% if filtered_posts.size == 0 %}
  <div class="empty-state">
    <p>还没有技术文章，敬请期待！</p>
  </div>
  {% endif %}

  <div class="section-links" style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #e8e8e8;">
    <p style="text-align: center; color: #666;">
      也可以查看我们的 <a href="https://www.epapercanvas.com/zh/" style="color: #0066cc;" target="_blank">产品栏目</a>
    </p>
  </div>
</div>

