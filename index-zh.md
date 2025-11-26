---
layout: default
lang: zh
permalink: /zh/
---

<div class="home">
  <div class="hero">
    <p class="intro-text">
      产品功能、更新和用户故事<br>
      发现电子纸相框如何改变您的空间<br>
      来自真实用户的真实体验。
    </p>
    <img src="/pics/main.jpeg" alt="电子纸产品" class="intro-image">
  </div>

  <div class="posts">
    <h2 class="posts-title">最新产品文章</h2>
    <ul class="post-list">
      {% assign filtered_posts = site.posts | where: "lang", "zh" | where_exp: "post", "post.category == 'product' or post.category contains 'product' or post.categories contains 'product'" | sort: "date" | reverse %}
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
    <p>还没有文章，敬请期待！</p>
  </div>
  {% endif %}
</div>

