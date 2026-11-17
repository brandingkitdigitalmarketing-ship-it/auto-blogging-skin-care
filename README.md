# 🌿 Lumière Derma Journal — AI-Powered Skincare & Haircare Editorial Publication

> **Evidence-Based Dermatology & Trichology Intelligence**  
> Modern, SEO-optimized, fully automated editorial magazine operating with AI-powered trend discovery, clinical research synthesis, automatic internal linking, and scheduled daily publishing.

---

## 🌟 Executive Overview

**Lumière Derma Journal** is a high-end international digital editorial publication inspired by premier dermatology and beauty science journals (*JAAD, British Journal of Dermatology, Byrdie, Vogue Beauty*).

Designed with a crisp white background accented by soft healthcare blue (`#0ea5e9`), clinical emerald green (`#10b981`), and subtle purple accents, it delivers evidence-based skincare, trichology (hair & scalp biology), in-office aesthetic dermatology treatments, and cosmetic chemistry research with Board-Certified Dermatologist oversight.

The publication operates an **AI Auto-Blogging Engine** that automatically discovers emerging dermatology trends, analyzes peer-reviewed medical publications (PubMed/NCBI, AAD, DermNet), synthesizes 1,200–1,800+ word structured articles with routine tables and FAQ schemas, and publishes on a configurable daily schedule (default: **3 articles per day**).

---

## 🏛️ Website Architecture & 12 Editorial Categories

The publication implements dedicated, SEO-friendly landing pages (`/category/[slug]`) for each of the 12 core editorial categories:

| Category | Slug | Primary Focus |
|---|---|---|
| **1. Skincare News** | `/category/skincare-news` | Formulations, regulatory shifts, viral trend analyses & barrier science. |
| **2. Haircare News** | `/category/haircare-news` | Scalp microbiome, follicle biology, hair density & peptide research. |
| **3. Dermatology** | `/category/dermatology` | Clinical cutaneous medicine, inflammatory dermatoses & diagnostic insights. |
| **4. Beauty & Wellness** | `/category/beauty-wellness` | Skin-gut-brain axis, nutritional dermatology, sleep chronobiology & cortisol. |
| **5. Acne & Pimples** | `/category/acne-pimples` | Comedonal, cystic, hormonal & fungal acne protocols with BHA/Benzoyl. |
| **6. Anti-Aging** | `/category/anti-aging` | Cellular senescence, retinoid titration, collagen induction & photoprotection. |
| **7. Hair Loss & Hair Transplant** | `/category/hair-loss-transplant` | Androgenetic alopecia, FUE/FUT transplant techniques, Minoxidil & Finasteride. |
| **8. Skin Treatments** | `/category/skin-treatments` | Microneedling, RF energy, chemical peels, hydrafacials & exosome biovesicles. |
| **9. Cosmetic Dermatology** | `/category/cosmetic-dermatology` | Neuromodulators (Botox), dermal fillers, biostimulators & laser resurfacing. |
| **10. Product Reviews** | `/category/product-reviews` | Blind testing, cosmetic chemistry breakdown, formulation matrices & pros/cons. |
| **11. Research & Medical Updates** | `/category/research-medical-updates` | Double-blind trials, JAAD & Lancet publications, FDA monograph alerts. |
| **12. Expert Advice** | `/category/expert-advice` | Direct clinical pearls, Do’s & Don’ts, and routine protocols from physicians. |

---

## 🎨 Premium Homepage Design

The homepage implements a complete 13-section magazine layout:
1. **Top News Wire Ticker (`NewsTicker.tsx`)**: Live animated ticker featuring breaking dermatology stories and physician oversight badges.
2. **Editorial Logo & Navigation Bar (`Header.tsx`)**: High-end branding, multi-level dropdowns for all 12 categories, live search trigger (`⌘K`), dark mode toggle, and one-click AI Admin shortcut.
3. **Main Hero Section (`HeroSection.tsx`)**: Asymmetrical cover feature highlighting top trending investigations with reading times and author credentials.
4. **Breaking Beauty News Section (`BreakingNews.tsx`)**: Rapid-read news cards for regulatory decisions and clinical breakthroughs.
5. **Latest Published Articles (`LatestArticles.tsx`)**: Chronological dispatches with interactive category filtering.
6. **Trending Skincare Topics (`TrendingSkincare.tsx`)**: Evidence-based routines, acne protocols, retinoid titration, and barrier repair guides.
7. **Haircare & Scalp Health (`HaircareGuides.tsx`)**: Trichology guides covering follicular biology and seborrheic dermatitis eradication.
8. **Dermatologist-Approved Advice (`DermAdvice.tsx`)**: Clinical pearls from Board-Certified Dermatologists with an evidence-backed "Do's and Don'ts" cheat sheet.
9. **Product Reviews & Comparisons (`ProductReviews.tsx`)**: Side-by-side product ratings, physiological lipid metrics, and pros/cons checklists.
10. **Beauty Ingredients Explained (`IngredientsSection.tsx`)**: Interactive cosmetic chemistry explorer detailing molecular weights, transdermal pH ranges, and pairing rules.
11. **Popular Articles Leaderboard (`PopularArticles.tsx`)**: Numbered rank cards (01 to 05) tracking top reader engagement.
12. **Newsletter Subscription (`NewsletterBox.tsx`)**: High-converting clinical dispatch capture with category preferences.
13. **Comprehensive Editorial Footer (`Footer.tsx`)**: Multi-column links, FTC affiliate disclaimers, mandatory medical notice, and syndication links.

---

## 🤖 10-Step AI Auto-Blogging Workflow

The system executes a fully automated daily publishing cycle:
1. **Step 1: Trend Discovery**: Monitors PubMed, AAD clinical bulletins, FDA regulatory notices, and Google Search Trends.
2. **Step 2: Source Verification**: Filters medical research from accredited dermatology journals.
3. **Step 3: Clinical Synthesis**: Analyzes physiological mechanisms, lipid barrier interactions, and trial endpoints.
4. **Step 4: AI Article Generation**: Crafts an authoritative 1,200–1,800+ word article using Google Gemini, OpenAI, or the Built-In Dermatology Knowledge Engine.
5. **Step 5: Technical SEO**: Generates H1 headline, meta descriptions, H2/H3 headings, keywords, and URL slugs.
6. **Step 6: High-Res Editorial Photography**: Selects and attaches curated royalty-free images (Unsplash) with descriptive alt text.
7. **Step 7: Automatic Internal Linking**: Links active ingredient keywords to existing publication guides.
8. **Step 8: Plagiarism & Medical Review**: Validates factual accuracy; flags high-risk therapeutic claims for editorial draft review.
9. **Step 9: Daily Publishing**: Publishes 3 articles per day (Morning 09:00, Afternoon 13:00, Evening 18:00) or saves to draft queue.
10. **Step 10: Syndication & Sitemap Updates**: Instantly refreshes `/sitemap.xml` (Google News compliant) and notifies administrator.

---

## 🎛️ Administrator Dashboard (`/admin`)

* **Overview (`/admin`)**: Total published articles, scheduled items, drafts, monthly visitors, and top search keywords.
* **Articles Queue (`/admin/articles`)**: Full management table with instant status toggling (Published / Draft / Scheduled), category filters, and SEO scores.
* **AI Writing Studio (`/admin/studio`)**: Interactive prompt studio to generate on-demand articles on any topic with custom keyword injection and live Markdown preview.
* **Trend Radar (`/admin/trends`)**: Live feed of discovered topics with 1-click *"Generate Article"* actions.
* **AI Automation Settings (`/admin/settings`)**: Adjust daily publishing count (1–8), target categories, word count ranges, and API keys.
* **Monetization & Ads (`/admin/monetization`)**: Manage Google AdSense Client ID, header/in-article/sidebar ad slots, and affiliate parameters.
* **SEO & Schema.org (`/admin/seo`)**: Live XML Sitemap inspector (`/sitemap.xml`), Robots.txt inspector (`/robots.txt`), Schema.org validator, and GA4 / Search Console tags.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 🌐 Production Deployment (Hostinger & GitHub)

For complete Hostinger VPS, Cloud, and Web Hosting deployment instructions, refer to:  
👉 **[HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md)**

* **Process Management:** Pre-configured `ecosystem.config.js` for PM2.
* **Web Server:** Pre-configured `nginx.conf` reverse proxy with SSL & Gzip caching.
* **Docker Support:** Ready-to-build `Dockerfile` and `.dockerignore`.
* **CI/CD:** Automated GitHub Actions deployment (`.github/workflows/deploy-hostinger.yml`).
* **Daily Cron:** Automated cloud publishing (`.github/workflows/daily-auto-publish.yml`).

---

## 🔒 Security & Performance Compliance

* Strict Medical Disclaimer notices on every article and footer.
* No hallucinated medical statistics; peer-reviewed citations only.
* Application Passwords and API keys isolated in environment variables.
* Zero external database dependency: lightning-fast persistent JSON storage in `/data`.
* Core Web Vitals optimized (Next.js Image, Font optimization, ISR caching).
