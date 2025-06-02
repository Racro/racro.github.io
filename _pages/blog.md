---
layout: page
permalink: /blog/
title: blog
description: thoughts, stories and ideas
nav: true
nav_order: 2
---

<div class="blog">
  <div class="row">
    <div class="col-sm mt-3 mt-md-0">
      {%- assign posts = site.posts | sort: 'date' | reverse -%}
      {%- for post in posts -%}
        <div class="post-preview">
          <h2 class="post-title">
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h2>
          <p class="post-meta">
            Posted on {{ post.date | date: "%B %-d, %Y" }}
            {%- if post.categories.size > 0 -%}
              in
              {%- for category in post.categories -%}
                <a href="{{ '/blog/categories/' | relative_url }}#{{ category | slugify }}">{{ category }}</a>
                {%- unless forloop.last -%}, {%- endunless -%}
              {%- endfor -%}
            {%- endif -%}
          </p>
          <div class="post-content">
            {{ post.excerpt }}
            <a href="{{ post.url | relative_url }}" class="read-more">Read More</a>
          </div>
        </div>
        {%- unless forloop.last -%}<hr>{%- endunless -%}
      {%- endfor -%}
    </div>
  </div>
</div>
