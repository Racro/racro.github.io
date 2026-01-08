---
layout: page
permalink: /blog/
title: blog
description: thoughts, stories and ideas
nav: true
nav_order: 2
---

<main class="blog-hub" role="main">
  <div class="poems-grid">
    <article class="poem-card-wrapper">
      <a href="{{ '/poems/' | relative_url }}" class="poem-card" aria-label="मेरी कलम से">
        <img
          src="{{ '/assets/img/blog/poetry.jpg' | relative_url }}"
          alt="मेरी कलम से"
          class="poem-card-image"
          loading="lazy"
        >
        <div class="poem-card-content">
          <h2 class="poem-card-title">मेरी कलम से</h2>
          <p class="poem-card-note">selected poems - love, dreams, heartbreaks and raw emotions penned down</p>
          <span class="poem-card-year">collection</span>
        </div>
      </a>
    </article>

    <article class="poem-card-wrapper">
      <a href="{{ '/treks/' | relative_url }}" class="poem-card" aria-label="Treks">
        <img
          src="{{ '/assets/img/blog/trek.webp' | relative_url }}"
          alt="Treks"
          class="poem-card-image"
          loading="lazy"
        >
        <div class="poem-card-content">
          <h2 class="poem-card-title">Treks</h2>
          <p class="poem-card-note">Travel notes & trails. (Under construction.)</p>
          <span class="poem-card-year">soon</span>
        </div>
      </a>
    </article>
  </div>
</main>
