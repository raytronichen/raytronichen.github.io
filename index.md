---
layout: default
---

<div class="home">
  <div class="hero">
    <p class="intro-text">
      Where technology meets stillness<br>
      Calm, reflective, and energy-efficient —<br>
      a piece of living artwork quietly powered by ePaper.
    </p>
    <img src="/pics/main.jpeg" alt="ePaper Frame" class="intro-image">
  </div>

  <div class="posts">
    <h2 class="posts-title">Latest Posts</h2>
    <ul class="post-list">
      {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%B %d, %Y" }}</span>
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

  {% if site.posts.size == 0 %}
  <div class="empty-state">
    <p>No posts yet. Stay tuned!</p>
  </div>
  {% endif %}
</div>

