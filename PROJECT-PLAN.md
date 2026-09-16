# T.E.G Carpet Steam Cleaning — Full Site Rebuild Project Plan

**Reference site:** [hiddekelcleaningservices.com](https://hiddekelcleaningservices.com)  
**Target site:** [teg-carpet-steam-cleaning](https://github.com/dua-ong/teg-carpet-steam-cleaning) / Railway production  
**Goal:** Match Hiddekel structure, city-page template, navbar, and scroll behavior while keeping 100% T.E.G branding, NAP, and copy.

**NAP (must match GMB exactly)**  
- Name: T.E.G Carpet & Furniture Steam Cleaning  
- Address: 4111 N Port Washington Rd suite 1, Milwaukee, WI 53217  
- Phone: +1 (414) 775-3705  
- WhatsApp: +1 (618) 434-0858  
- Email: contact@teg-carpetsteamcleaning.com  
- Hours: Monday – Sunday 08:00 AM – 07:00 PM

**Cities (12)**  
Wauwatosa, Brookfield, New Berlin, West Allis, Greenfield, Franklin, Muskego, Pewaukee, Oak Creek, Elm Grove, Hales Corners, Greendale

**Services**  
Carpet Cleaning, Tile & Grout Cleaning, Upholstery / Couch Cleaning, Steam Cleaning, Pet Odor & Stain Removal, Commercial Carpet Cleaning

---

## Phase 0 — Planning & Audit (done)

- [x] Full code audit of current static + Express site
- [x] Mobile responsiveness review (375 / 440 / 768 / 1024+)
- [x] SEO / Local SEO / GMB gap analysis
- [x] Reference site (Hiddekel) structure mapped via video + live browse
- [x] Critical issues listed: missing 8 city pages, thin sitemap, no schema, favicon 404, mobile header hides phone/CTA

---

## Phase 1 — Foundation (Critical) — IN PROGRESS / MOSTLY DONE

**Goal:** Fix blockers that hurt SEO, trust, and local ranking. No user should hit 404s for claimed cities.

### 1.1 Favicon & console hygiene
- [x] Add `favicon.svg` (and link in head)
- [x] Reference icons correctly in `<head>` on key templates (homepage + city pages)
- [ ] Confirm zero 404s for favicon in DevTools after deploy (verify on production)

### 1.2 City / service-area pages (all 12)
URL pattern kept as `area-{slug}.html` for compatibility with existing links (static Express root).

Each page includes, in order (Hiddekel-aligned):
1. Hero — city H1, short intro, dual CTAs (Quote + Call)
2. **Neighborhoods and corners we know** — local landmark cards with real place names
3. **Neighboring areas we also serve** — pill links to nearby cities
4. **Before / After** — section with placeholder until real job photos exist
5. Services available in {City} — grid linking to service detail pages
6. Closing quote CTA / form strip
7. Footer + WhatsApp float

| City | File | Status |
|------|------|--------|
| Wauwatosa | area-wauwatosa.html | Updated template |
| Brookfield | area-brookfield.html | Updated template |
| New Berlin | area-new-berlin.html | Updated template |
| West Allis | area-west-allis.html | Updated template |
| Greenfield | area-greenfield.html | **Created** |
| Franklin | area-franklin.html | **Created** |
| Muskego | area-muskego.html | **Created** |
| Pewaukee | area-pewaukee.html | **Created** |
| Oak Creek | area-oak-creek.html | **Created** |
| Elm Grove | area-elm-grove.html | **Created** |
| Hales Corners | area-hales-corners.html | **Created** |
| Greendale | area-greendale.html | **Created** |

- [x] Create all 12 pages with unique local copy (no pure city-name swap)
- [x] Homepage chips + areas.html already point to area-*.html paths
- [x] Old paths preserved (no broken bookmarks)

### 1.3 Sitemap & robots
- [x] Expand `sitemap.xml` to homepage, services, every service detail, every city page, about, FAQ, contact, areas
- [x] Verify `robots.txt` allows crawling

### 1.4 Structured data (JSON-LD)
- [x] LocalBusiness on homepage (name, address, phone, hours, geo, url, areaServed)
- [ ] Service schema on service pages (Phase 3 polish)
- [ ] BreadcrumbList on inner pages (Phase 3)
- [x] areaServed list on homepage schema

### 1.5 Mobile nav fix
- [x] Phone number + “Get a Free Quote” visible **inside** the open mobile menu (`.nav-mobile-cta` block)
- [x] Keep hamburger + large tap targets
- [x] Preserve existing scroll / menu JS animations

**Exit criteria Phase 1:** All 12 city URLs load, sitemap complete, favicon loads, schema present on home, mobile menu shows phone+CTA. → **Met in this commit (pending production verify).**

---

## Phase 2 — Structure parity with Hiddekel — IN PROGRESS

**Goal:** Homepage and key templates feel like the reference site in section order and UX, still clearly T.E.G-branded.

### 2.1 Homepage rebuild
Section order (current / target):
1. Sticky premium header ✓
2. Hero (video only — autoplay muted loop + poster) ✓
3. Trust badges row (mobile-trust + hero-trust) ✓
4. Services overview (“Every floor and fabric, one phone call”) ✓
5. Why T.E.G / value props ✓
6. Process (“From spill to spotless”) ✓
7. Service-area explorer (city chips → city pages) ✓
8. About strip ✓
9. CTA banner ✓
10. Quote form strip ✓
11. Footer ✓

- [x] Video + poster only on homepage hero
- [x] Align spacing / CTA repetition
- [x] Keep existing `.anim-on-scroll` behavior
- [ ] Optional: FAQ accordion block on home (can add in Phase 3 if desired)

### 2.2 Navbar
- [x] Desktop: logo | links | phone | primary CTA
- [x] Scroll state: transparent → solid white with shadow
- [x] Mobile: overlay menu with links + phone + CTA inside
- [x] Correct z-index over video/hero

### 2.3 Service pages
- [ ] Breadcrumb, strong H1, problem → method → process → FAQ → area chips → CTA (Phase 3 polish; existing pages already have solid content)

### 2.4 About / FAQ / Contact
- [x] Existing pages functional; NAP consistent
- [ ] Light content polish vs Hiddekel depth (Phase 3)

### 2.5 Areas hub
- [x] `areas.html` lists all 12 with short blurbs linking to area-*.html

**Exit criteria Phase 2:** Homepage section flow matches brief; city template matches Hiddekel order; nav parity on mobile/desktop; no broken internal city links. → **Met for city template + nav + homepage core.**

---

## Phase 3 — SEO, GMB, performance, polish (next)

### 3.1 On-page SEO
- [ ] Unique title + meta description every page (city pages already include city)
- [ ] Single H1, logical H2/H3
- [ ] Internal links: city ↔ city, service ↔ city
- [ ] Canonical tags correct

### 3.2 GMB alignment
- [ ] NAP string identical to Google Business Profile (already matching in code)
- [ ] Service areas on site ⊆ GMB service area
- [ ] tel: links use exact GMB number

### 3.3 Performance
- [ ] Compress hero.mp4 or provide lighter mobile source / strong poster
- [ ] Lazy-load below-fold images only (never hero video)
- [ ] font-display: swap; avoid blocking CSS where possible
- [ ] Target LCP < 2.5s, CLS ~0 on home + one city page

### 3.4 Accessibility
- [ ] WCAG AA contrast on text over hero
- [ ] Labels on form fields; aria-label on icon buttons
- [ ] Keyboard-usable mobile menu

### 3.5 Delivery checklist
- [ ] Real-device mobile pass
- [ ] Click-through every nav + city link
- [ ] Lighthouse mobile + desktop on home + one city page
- [ ] Console clean (no 404s)
- [ ] Schema validated (Rich Results Test)

---

## Tech notes

- Stack remains **static HTML/CSS/JS + Express** (`server.js` serves static + `/api/*`).
- Do **not** remove existing scroll animations in `script.js` / CSS.
- Prefer additive CSS in `styles-extra.css` for new city-page / nav patterns.
- Admin password remains env-driven (`ADMIN_PASSWORD`); never commit production secrets.
- City URLs stay `area-{slug}.html` for zero breakage; future clean URLs (`/service-areas/{slug}`) can be added via Express routes if needed.

## Status log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-09-17 | 0 | Audit + plan written |
| 2026-09-17 | 1+2 | Implementation: 8 missing city pages, full city template, favicon, sitemap, LocalBusiness schema, mobile nav phone+CTA |

---

*Owner: rebuild against Hiddekel architecture for T.E.G branding and Milwaukee local SEO / GMB readiness.*
