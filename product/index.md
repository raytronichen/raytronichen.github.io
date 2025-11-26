---
layout: default
lang: en
category: product
permalink: /product/
---

<div class="home">
  <div class="hero">
    <p class="intro-text">
      Product features, updates, and user stories<br>
      Discover how ePaper frames transform your space<br>
      Real experiences from real users.
    </p>
    <img src="/pics/main.jpeg" alt="ePaper Product" class="intro-image">
  </div>

  <div class="posts">
    <h2 class="posts-title">Latest Product Posts</h2>
    <ul class="post-list">
      {% assign current_lang = page.lang | default: site.default_lang %}
      {% assign filtered_posts = site.posts | where: "lang", current_lang | where: "category", "product" | sort: "date" | reverse %}
      {% for post in filtered_posts %}
      <li>
        <span class="post-meta">
          {% if current_lang == 'zh' %}
            {{ post.date | date: "%Y年%m月%d日" }}
          {% else %}
            {{ post.date | date: "%B %d, %Y" }}
          {% endif %}
        </span>
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
    <p>No product posts yet. Stay tuned!</p>
  </div>
  {% endif %}

  <div class="section-links" style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #e8e8e8;">
    <p style="text-align: center; color: #666;">
      Also check out our <a href="https://www.einkframe.com/" style="color: #0066cc;" target="_blank">Tech section</a>
    </p>
  </div>
</div>

