---
layout: page
title: projects
permalink: /projects/
description: A growing collection of your cool projects.
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
---

<!-- pages/projects.md -->
<div class="projects">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>

## Selected Projects

### LLM-assisted Ad Content Moderation Framework
Developed a framework to enable adblockers to detect and block problematic ads using LLMs, protecting users from excessive tracking and intrusive advertising. [Paper](#) | [Code](#)

### Drifuzz: Kernel-Assisted Network Fuzzer
A kernel-assisted network fuzzer for PCI device drivers, discovering and patching bugs in Linux driver code. [Paper](#) | [Code](#)

### KANF: Kernel-Assisted Network Fuzzer
Developed at UCSB SecLab, tested 10,000+ open-source network programs for bugs using Linux kernel driver modules and networking tools. [Read more](https://github.com/Racro/kanf)

### Privacy-Preserving Browser Extension Evaluation
Built a usability and privacy framework to evaluate browser extensions on performance, permission abuse, and web compatibility. [Paper](#) | [Code](#)

### Web Breakage Analysis for Adblockers
Conducted large-scale web measurement experiments to quantify and improve web breakages caused by adblockers. [Paper](#) | [Code](#)
