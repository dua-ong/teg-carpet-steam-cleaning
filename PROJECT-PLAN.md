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

**URL convention (kept for zero breakage)**  
`area-{slug}.html` (e.g. `area-wauwatosa.html`). Future clean paths `/service-areas/{slug}` can be added via Express later.

---

## Phase 0 — Planning & Audit ✅ DONE

- [x] Full code audit of static HTML + Express (`server.js`)
- [x] Mobile responsiveness review (375 / 390–430 / 768 / 1024+)
- [x] SEO / Local SEO / GMB gap analysis
- [x] Reference site structure mapped (video frames + live site)
- [x] Critical issues logged: missing 8 city pages, thin city template, incomplete schema, favicon not linked on all pages, mobile header hides phone/CTA

---

## Phase 1 — Foundation (Critical) ✅ IMPLEMENTING THIS COMMIT

**Goal:** No 404s for claimed cities. Favicon clean. Sitemap complete. LocalBusiness schema on home. Mobile menu shows phone + primary CTA.

### 1.1 Favicon & console hygiene
- [x] `favicon.svg` present in repo
- [x] Link `<link rel="icon" href="favicon.svg" type="image/svg+xml">` on homepage + all city pages + core templates
- [ ] Confirm zero favicon 404s in production DevTools after deploy

### 1.2 City / service-area pages (all 12) — full Hiddekel-aligned template

Each page section order (exact):
1. Sticky header
2. **Page hero** — city H1, short local intro, dual CTAs (Quote + Call)
3. **Neighborhoods and corners we know** — 3–4 landmark cards with real place names
4. **Neighboring areas we also serve** — pill links to nearby cities
5. **Before / After** — placeholder section (ready for real job photos)
6. **Services available in {City}** — grid linking to service detail pages
7. **Closing CTA banner** — quote + call
8. Footer + WhatsApp float

| City | File | Status |
|------|------|--------|
| Wauwatosa | `area-wauwatosa.html` | Full template |
| Brookfield | `area-brookfield.html` | Full template |
| New Berlin | `area-new-berlin.html` | Full template |
| West Allis | `area-west-allis.html` | Full template |
| Greenfield | `area-greenfield.html` | **Created** |
| Franklin | `area-franklin.html` | **Created** |
| Muskego | `area-muskego.html` | **Created** |
| Pewaukee | `area-pewaukee.html` | **Created** |
| Oak Creek | `area-oak-creek.html` | **Created** |
| Elm Grove | `area-elm-grove.html` | **Created** |
| Hales Corners | `area-hales-corners.html` | **Created** |
| Greendale | `area-greendale.html` | **Created** |

- [x] Unique local copy per city (landmarks, not pure name-swap)
- [x] Homepage chips + `areas.html` point to these paths

### 1.3 Sitemap & robots
- [x] `sitemap.xml` lists all 12 cities + services + core pages
- [x] `robots.txt` allows crawling

### 1.4 Structured data (JSON-LD)
- [x] LocalBusiness on homepage (name, address, phone, hours, geo, url, areaServed)
- [ ] Service schema on service pages → Phase 3
- [ ] BreadcrumbList on inner pages → Phase 3

### 1.5 Mobile nav fix
- [x] Phone + “Get a Free Quote” visible **inside** open mobile menu (`.nav-mobile-cta`)
- [x] Hamburger + large tap targets kept
- [x] Existing scroll / menu JS preserved

**Exit criteria Phase 1:** All 12 city URLs load with full template · sitemap complete · favicon linked · schema on home · mobile menu shows phone+CTA. → **Met in this commit (pending production verify).**

---

## Phase 2 — Structure parity with Hiddekel ✅ IMPLEMENTING THIS COMMIT

**Goal:** Homepage and city templates feel like the reference in section order and UX; still clearly T.E.G-branded.

### 2.1 Homepage
Section order:
1. Sticky premium header ✓
2. Hero — **video only** (autoplay muted loop + poster) ✓
3. Trust badges (mobile-trust + hero-trust) ✓
4. Services overview ✓
5. Why T.E.G / value props ✓
6. Process (“From spill to spotless”) ✓
7. Service-area explorer (12 city chips) ✓
8. About strip ✓
9. CTA banner ✓
10. Quote form ✓
11. Footer ✓

- [x] Video + poster only on homepage hero
- [x] Existing `.anim-on-scroll` kept
- [ ] Optional FAQ accordion on home → Phase 3

### 2.2 Navbar
- [x] Desktop: logo | links | phone | primary CTA
- [x] Scroll state: transparent → solid white + shadow
- [x] Mobile overlay: links + phone + CTA inside menu
- [x] Correct z-index over video

### 2.3 Service pages
- Existing pages have solid content; full breadcrumb / FAQ polish → Phase 3

### 2.4 About / FAQ / Contact
- NAP consistent; light depth polish → Phase 3

### 2.5 Areas hub
- [x] `areas.html` lists all 12 with blurbs → area-*.html

**Exit criteria Phase 2:** Homepage flow matches brief · city template matches Hiddekel order · nav parity · no broken internal city links. → **Met for city template + nav + homepage core.**

---

## Phase 3 — SEO, GMB, performance, polish (NEXT)

### 3.1 On-page SEO
- Unique title + meta every page
- Single H1, logical H2/H3
- Internal links city ↔ city, service ↔ city
- Canonical tags

### 3.2 GMB alignment
- NAP identical to Google Business Profile
- Service areas on site ⊆ GMB
- `tel:` links use exact GMB number

### 3.3 Performance
- Compress / lighter mobile source for `media/hero.mp4` (~5.6 MB)
- Lazy-load only below-fold images
- `font-display: swap`
- Target LCP < 2.5s, CLS ~0

### 3.4 Accessibility
- WCAG AA contrast on hero text
- Form labels; aria on icon buttons
- Keyboard-usable mobile menu

### 3.5 Delivery checklist
- Real-device mobile pass
- Click-through every nav + city link
- Lighthouse mobile + desktop (home + one city)
- Console clean
- Schema validated (Rich Results Test)

---

## Tech constraints

- Stack stays **static HTML/CSS/JS + Express** (`server.js` serves static + `/api/*`).
- **Do not remove** existing scroll animations in `script.js` / CSS.
- Prefer additive CSS in `styles-extra.css` for city-page / nav patterns.
- Admin password env-driven (`ADMIN_PASSWORD`); never commit secrets.
- City URLs stay `area-{slug}.html` for zero breakage.

---

## Status log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-09-17 | 0 | Audit + plan written |
| 2026-09-17 | 1+2 | Full city template (all 12) · favicon links · LocalBusiness schema · mobile nav CTA · city-page CSS sections |

---

*Owner: rebuild against Hiddekel architecture for T.E.G branding and Milwaukee local SEO / GMB readiness.*
