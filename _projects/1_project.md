---
layout: page
title: AdLens
description: Efficient detection of deceptive software ads at scale — CCS 2026
img: assets/img/adlens/architecture.png
importance: 1
category: work
related_publications: true
---

<p>
  <a href="https://racro.github.io/project/adlens"><strong>AdLens</strong> — visit the live site ↗</a>
  &nbsp;|&nbsp;
  <a href="/publications/">← Back to Publications</a>
</p>

Threat actors increasingly use online advertising as a delivery vector for malware, fraud and scams — often by pressuring users into installing software through fake device-infection warnings or promises of unrealistic capabilities. **AdLens** is a scalable, multilingual, modular pipeline that detects three categories of deceptive software ads at scale on Google's Ads Transparency Center: **scareware** (fake security threats), **deceptive claims** (plausible but false statements), and **misleading ad design** (ads that conceal advertiser identity and intent).

AdLens uses a two-stage approach for efficiency: a low-cost semantic-similarity prioritization stage over embedded ad text, followed by a high-precision LLM-based classifier ensemble built on open-weight vision-language models. Applying AdLens to 188k crawled software-related ad creatives, we identified hundreds of deceptive ads that together received millions of impressions, and reported malicious ads that led to takedowns by Google.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/adlens/architecture.png" title="AdLens architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    AdLens architecture: an ad collection pipeline (crawl → OCR → translation) feeds a two-stage analysis pipeline — semantic-similarity ranking against reference statements, followed by multi-VLM ensemble voting with judge-based disagreement resolution.
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/adlens/example-ads.jpg" title="Example deceptive ads" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Real deceptive software ads identified by AdLens: fake virus/hack/storage warnings (scareware), low-information call-to-action buttons with no advertiser identity (misleading design), and plausible-but-false claims like phone tracking or deleted-photo recovery (deceptive claims).
</div>

I built and deployed a companion website that runs the pipeline's search stage live — semantic similarity search over the full 109k-ad corpus using `google/embeddinggemma-300m` embeddings and Cloudflare Vectorize — alongside a walkthrough of the detection pipeline and the paper's full data tables.

**Links:** [Website](https://racro.github.io/project/adlens) &nbsp;|&nbsp; [Paper](/papers/adlens.pdf) &nbsp;|&nbsp; [Code](https://github.com/Racro/ccs-2026-AdLens)

{% cite adlens2026 %}
