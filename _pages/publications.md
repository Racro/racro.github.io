---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order.
years: [2025, 2024, 2023, 2022]
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->

<div class="publications">
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
</div>

## Posters

1. **Poster Title 1**
   - Presented at Conference 1, 2024
   - [PDF](/posters/poster1.pdf)

2. **Poster Title 2**
   - Presented at Conference 2, 2023
   - [PDF](/posters/poster2.pdf)
