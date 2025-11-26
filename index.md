---
layout: default
lang: en
permalink: /
---

<div class="home">
  <div class="hero">
    <p class="intro-text" data-en="Where technology meets stillness<br>Calm, reflective, and energy-efficient —<br>a piece of living artwork quietly powered by ePaper." data-zh="科技与静谧相遇<br>平静、沉思、节能 —<br>由电子纸静静驱动的活艺术品。">
      Where technology meets stillness<br>
      Calm, reflective, and energy-efficient —<br>
      a piece of living artwork quietly powered by ePaper.
    </p>
    <img src="/pics/main.jpeg" alt="ePaper Frame" class="intro-image">
  </div>

  <div class="posts">
    <h2 class="posts-title" data-en="Latest Posts" data-zh="最新文章">Latest Tech Posts</h2>
    <ul class="post-list">
      {% assign current_lang = page.lang | default: site.default_lang %}
      {% assign filtered_posts = site.posts | where: "lang", current_lang | where_exp: "post", "post.category == 'tech' or post.category contains 'tech' or post.categories contains 'tech'" | sort: "date" | reverse %}
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
    <p data-en="No posts yet. Stay tuned!" data-zh="还没有文章，敬请期待！">No posts yet. Stay tuned!</p>
  </div>
  {% endif %}
</div>

