---
layout: cv
permalink: /cv/
title: cv
description: 
nav: true
nav_order: 2
cv_pdf: assets/CV/CV_09_01_26.pdf
toc:
  sidebar: left
---

## Download CV
- [Full CV](/assets/CV/CV_09_01_26.pdf)

## Research Statement
I aim to build open source frameworks that create real world impact while advancing academic research. I focus on transforming digital advertising through automated content moderation and detecting malicious actors in the ad supply chain. My past work includes empirical studies on privacy-enhancing technologies, propaganda, and harmful ads; using AI to detect contextual nuances and mitigate these issues at scale. Going forward, I aim to enhance user experience online by uncovering differential treatment, fighting fraud, and conducting large scale measurements to improve widely used tools.

## Education
- **Ph.D. in Computer Science** (Sep 2021 - Jun 2026)
  - New York University (NYU), New York City, USA
  - Advisors: Prof. R. Greenstadt & Prof. B.D. Gavitt
  - Thesis: *Adblocking's Privacy Tradeoffs and the Future of Sustainable Advertising*

- **B.Tech in Computer Science and Engineering** (Sep 2017 - May 2021)
  - Indian Institute of Technology Bombay (IITB), Mumbai, India
  - GPA: 8.15/10.0
  - Thesis: *Large-scale assessment of vulnerabilities in open-source network server binaries*

## Work Experience
- **Sr. Staff Web Security Researcher**, Palo Alto Networks (Aug 2026 - Present)
  - Santa Clara, US | Guide: Oleksii Alex Starov
  - Part of the Advanced URL Filtering team handling malicious web URLs including JS, HTML, etc.

- **PhD Software Intern**, Uber Technologies (Sep - Nov 2025)
  - Sunnyvale, US | Guides: Xandra Xhu & Bo Ling
  - Implemented an LLM-based generative recommender model for UberEats homefeed for tar-aware predictions
  - Developed TPU and GPU compatible frameworks for generative recommender models for efficient hardware benchmarking, achieving 5.3x higher throughput on TPUs

- **Research Intern**, CISPA Helmholtz Center for Information Security (Jun - Aug 2024)
  - Saarbruecken, Germany | Guide: Ben Stock
  - Developed a novel mechanism to identify the differential treatment of adblocker users by websites, uncovering potential for fingerprinting users and degrading their user experience
  - Instrumented Google Chrome's V8 engine to collect JS execution logs to understand its inner workings

- **Research Intern**, University of California, Santa Barbara (Apr - Nov 2020)
  - Santa Barbara, USA | Guides: Giovanni Vigna and Christopher Kruegel
  - Developed KANF, a kernel-assisted network fuzzer, using Linux kernel driver modules and networking tools to test over 10,000 open-source network programs and conduct bug detection at scale
  - Interleaved the Linux Kernel with AFL using kernel driver modules and network programs

- **Software Engineer Intern**, A.P.T Portfolio (Apr - Jun 2020)
  - Delhi, India | Guide: Pratyush Rathore
  - Reported and patched crucial bugs in the source code implemented for processing daily traffic in excess of 4 crore orders at NSE, and developed and optimized a dynamic latency based exchange simulation model

- **Cyber Security Research Intern**, Lucideus (May - Jul 2019)
  - Delhi, India | Guide: Rahul Tyagi
  - Hardened CentOS Linux using 239 remediations as provided by CIS (Center for Internet Security) and prepared detailed documentation covering attacks and mitigation techniques on the OWASP Top 10

## Selected Publications
- **CCS '26**: AdLens: Efficient Detection of Deceptive Software Ads (w/ M.A. Darwish, M.A. Aghdam, R. Greenstadt, G. Acar) [[Paper]](/papers/adlens.pdf) [[Code]](https://github.com/Racro/ccs-2026-AdLens) [[Website]](https://racro.github.io/project/adlens)
  - Designed an open-source, multilingual two-stage LLM pipeline that audits ad transparency libraries at scale, cutting inference cost 17x versus exhaustive classification while achieving 0.92 F1
  - Used it to expose thousands of deceptive software ads and the malvertising campaigns hidden behind them, leading to takedowns after disclosure to Google
- **PETS '25**: Automated detection and evaluation of problematic 'allowed' advertisements (w/ Julia Jose, Hussam Habib, Rachel Greenstadt) [[Paper]](/papers/Accads_PETS.pdf) [[Poster]](/posters/Accads_poster.pdf) [[Code]](https://github.com/Racro/AcceptableAds_PETS.git)
- **AIWILD, ICLR '26**: When Agents Persuade: Rhetoric Generation and Mitigation in LLMs (w/ Julia Jose, Rachel Greenstadt) [[Poster]](/posters/Propaganda_poster.pdf)
- **AsiaCCS '24**: A User-Focused Evaluation of Privacy-Preserving Browser Extensions (w/ Rachel Greenstadt) [[Paper]](/papers/UserFocusedEvaluation_AsiaCCS.pdf) [[Code]](https://github.com/Racro/measurements_user-concerns.git)
- **SecWeb, IEEE S&P '24**: Analysis of web breakages caused by adblockers (w/ Mitchell Zhou, Ben Stock, Rachel Greenstadt) [[Paper]](/papers/secweb_breakages.pdf) [[Code]](https://github.com/Mitchellzhou1/Ad-BlockerResearch.git)
- **USENIX '22**: Drifuzz: Harvesting Bugs in Device Drivers from Golden Seeds (w/ Zekun Shen, Brendan Dolan-Gavitt) [[Paper]](/papers/Drifuzz_usenix.pdf) [[Code]](https://github.com/messlabnyu/DrifuzzProject.git)
  - Implemented a framework for concolic fuzzing PCI device drivers, discovering and patching 12 bugs and obtaining 2 CVEs in the Linux driver code

## Position of Responsibility
- **Teaching Assistant**, New York University | Application Security (Jan 2022 - Apr 2022)
  - Mentored a class of over 100 students in a remote setup, facilitating practical class demonstrations to instill a better understanding of niche concepts
- **Thesis Mentor**, New York University — *Real-time measurement of web breakages*, Mitchell Zhou (Sep 2023 - May 2024)
  - Mentored an undergraduate student for his bachelor's thesis on understanding web breakages and measuring them at scale, leading to a publication at SecWeb, IEEE S&P

## Reviewer Duties
- **Program Committee**: NDSS '25, PETS '24, MADWEB '25
- **Artifact Committee**: CCS '24/25, USENIX '23/24, PETS '25

## Awards / Leadership
- Presented research posters at Columbia Privacy Day and Google Ad Privacy Day [2025]
- Received a scholarship to attend summer school at EPFL, Switzerland and CISPA, Germany [2024]
- Received SoE fellowship from NYU in freshman year to facilitate research goals [2021]
- Secured All India Rank 48 in JEE-Advanced out of 220,000 shortlisted candidates [2017]
- Awarded KVPY Fellowship and NTSE Scholarship by the Government of India [2016]

## Skills
- **ML Paradigms**: Natural Language Processing, Prompt Engineering, Sentiment Analysis, Thematic Analysis, Supervised/Unsupervised Learning, RAG
- **ML Frameworks**: PyTorch, LLMs, VLMs, NumPy, Pandas, Jupyter
- **Internet Measurement**: Puppeteer, Selenium, Playwright, Web Extensions
- **Languages**: C/C++, Python, Bash, Java, Assembly, JavaScript
- **Security Tools**: Kali Linux, Metasploit Framework, Xerosploit, Reversing Tools
- **Software Tools**: Linux, Git, MATLAB, MySQL, AutoCAD, LaTeX, AWS, HPC, Slurm
