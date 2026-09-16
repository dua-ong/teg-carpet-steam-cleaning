# T.E.G Carpet & Furniture Steam Cleaning — Full Site Rebuild Project Plan

**Reference site:** [hiddekelcleaningservices.com](https://hiddekelcleaningservices.com)  
**Live / target:** [teg-carpet-steam-cleaning-production.up.railway.app](https://teg-carpet-steam-cleaning-production.up.railway.app)  
**Repo:** [dua-ong/teg-carpet-steam-cleaning](https://github.com/dua-ong/teg-carpet-steam-cleaning)

**Objective:** Rebuild so structure, page architecture, section layout, navbar behavior, city-page template, and scroll animations match Hiddekel — while keeping 100% T.E.G branding, colors, copy, services, and NAP.

---

## Business truth (NAP — must match GMB exactly)

| Field | Value |
|-------|--------|
| Name | T.E.G Carpet & Furniture Steam Cleaning |
| Address | 4111 N Port Washington Rd suite 1, Milwaukee, WI 53217 |
| Phone | +1 (414) 775-3705 |
| WhatsApp | +1 (618) 434-0858 |
| Email | contact@teg-carpetsteamcleaning.com |
| Hours | Monday – Sunday 08:00 AM – 07:00 PM |

**12 cities served**  
Wauwatosa · Brookfield · New Berlin · West Allis · Greenfield · Franklin · Muskego · Pewaukee · Oak Creek · Elm Grove · Hales Corners · Greendale

**Services**  
Carpet Cleaning · Tile & Grout Cleaning · Upholstery / Couch Cleaning · Steam Cleaning · Pet Odor & Stain Removal · Commercial Carpet Cleaning

**URL convention**  
`area-{slug}.html` · service pages as `service-*.html`

---

## Phase 0 — Planning & Audit ✅ DONE

## Phase 1 — Foundation ✅ DONE

- All 12 city pages · favicon · sitemap · LocalBusiness on home · mobile nav phone+CTA

## Phase 2 — Structure parity ✅ DONE

- Homepage section order · city template (Hiddekel order) · nav parity

---

## Phase 3 — SEO, GMB, performance, polish ✅ DONE (code) / verify on production

### 3.1 On-page SEO
- [x] Unique title + meta on core + city + service pages
- [x] Single H1, logical H2/H3
- [x] Internal links city ↔ city, service ↔ city (city pages + service area chips)
- [x] Canonical tags fixed (`contact.html`, `about.html` no longer use trailing-slash paths that mismatch static files)

### 3.2 GMB alignment
- [x] NAP string consistent across home, contact, about, footer, schema
- [x] Service areas listed (12 cities) aligned with site claims
- [x] `tel:+14147753705` used consistently

### 3.3 Structured data
- [x] LocalBusiness on homepage + contact + about
- [x] Service + BreadcrumbList on `service-carpet-cleaning.html` (template for other services)
- [x] FAQPage on `faq.html`

### 3.4 Performance
- [x] `font-display: swap` via Google Fonts URL
- [x] `preconnect` on key pages
- [x] Stronger hero poster/overlay (LCP path remains video + poster)
- [ ] **Manual:** compress `media/hero.mp4` (~5.6 MB) offline to ~1–2 MB H.264 for mobile LCP — cannot re-encode binary in this pass
- [ ] Run Lighthouse mobile + desktop after Railway deploy

### 3.5 Accessibility
- [x] Stronger hero overlay for text contrast
- [x] Form labels + autocomplete attributes on contact form
- [x] `aria-expanded` / `aria-controls` on mobile menu; Escape closes menu; focus first link on open
- [x] `:focus-visible` outlines
- [x] Skip-to-content link on key templates
- [x] `prefers-reduced-motion` respect

### 3.6 Delivery checklist (post-deploy)
- [ ] Real-device mobile pass
- [ ] Click-through every nav + all 12 city links
- [ ] Lighthouse mobile + desktop (home + one city)
- [ ] Console clean (favicon 404 gone)
- [ ] Schema validated (Google Rich Results Test)

---

## Tech constraints

- Stack: static HTML/CSS/JS + Express (`server.js`)
- Do not remove existing scroll animations
- Additive CSS in `styles-extra.css`
- Admin password env-driven only

---

## Status log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-09-17 | 0 | Audit + plan |
| 2026-09-17 | 1+2 | 12 city pages · template · schema home · mobile nav CTA |
| 2026-09-17 | 3 | Service/Breadcrumb/FAQ schema · canonical fixes · a11y · GMB NAP · focus/skip · remaining: compress hero.mp4 + production Lighthouse |

---

*Owner: rebuild against Hiddekel architecture for T.E.G branding and Milwaukee local SEO / GMB readiness.*
