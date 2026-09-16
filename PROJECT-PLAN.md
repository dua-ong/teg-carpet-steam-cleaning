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

## Phase 1 — Foundation (Critical)

**Goal:** Fix blockers that hurt SEO, trust, and local ranking. No user should hit 404s for claimed cities.

### 1.1 Favicon & console hygiene
- [ ] Add `favicon.svg` (and optional `favicon.ico` / apple-touch-icon)
- [ ] Reference icons correctly in `<head>` on all page templates
- [ ] Confirm zero 404s for favicon in DevTools

### 1.2 City / service-area pages (all 12)
URL pattern: `/service-areas/{slug}.html` (static-friendly)

Each page must include, in order:
1. Hero — city H1, short intro, dual CTAs (Quote + Call)
2. **Neighborhoods and corners we know** — 1–2 local landmark cards with real place names
3. **Neighboring areas we also serve** — pill links to nearby cities + “Greater Milwaukee”
4. **Before / After** — section with placeholder note until real job photos exist
5. Services available in {City} — grid linking to service detail pages (city-qualified copy)
6. Closing quote form (sitewide pattern)
7. Footer + WhatsApp float

Slugs:
| City | File |
|------|------|
| Wauwatosa | service-areas/wauwatosa.html |
| Brookfield | service-areas/brookfield.html |
| New Berlin | service-areas/new-berlin.html |
| West Allis | service-areas/west-allis.html |
| Greenfield | service-areas/greenfield.html |
| Franklin | service-areas/franklin.html |
| Muskego | service-areas/muskego.html |
| Pewaukee | service-areas/pewaukee.html |
| Oak Creek | service-areas/oak-creek.html |
| Elm Grove | service-areas/elm-grove.html |
| Hales Corners | service-areas/hales-corners.html |
| Greendale | service-areas/greendale.html |

- [ ] Create all 12 pages with unique local copy (no pure city-name swap)
- [ ] Update homepage chips + areas.html to point to new paths
- [ ] Keep or redirect old `area-*.html` files to avoid broken bookmarks

### 1.3 Sitemap & robots
- [ ] Expand `sitemap.xml` to homepage, services, every service detail, every city page, about, FAQ, contact, areas
- [ ] Verify `robots.txt` allows crawling

### 1.4 Structured data (JSON-LD)
- [ ] LocalBusiness on homepage (name, address, phone, hours, geo, url)
- [ ] Service schema on service pages
- [ ] BreadcrumbList on inner pages
- [ ] areaServed hints on city pages where practical

### 1.5 Mobile nav fix
- [ ] Phone number + “Get a Free Quote” visible **inside** the open mobile menu
- [ ] Keep hamburger + large tap targets (44px+)
- [ ] Preserve existing scroll / menu JS animations

**Exit criteria Phase 1:** All 12 city URLs load, sitemap complete, favicon loads, schema present on home, mobile menu shows phone+CTA.

---

## Phase 2 — Structure parity with Hiddekel

**Goal:** Homepage and key templates feel like the reference site in section order and UX, still clearly T.E.G-branded.

### 2.1 Homepage rebuild
Section order (target):
1. Sticky premium header
2. Hero (video only — autoplay muted loop + poster; no static hero image)
3. Trust badges row (upfront pricing, kid & pet safe, local, licensed)
4. Services overview (“Every floor and fabric, one phone call”)
5. Why T.E.G / value props
6. Process (“From spill to spotless”) — prefer photo cards like Hiddekel if assets allow
7. Service-area explorer (city chips → city pages)
8. FAQ accordion or “Questions we get every week”
9. Quote form strip (“Tell us what needs cleaning”)
10. Footer

- [ ] Remove reliance on static image in homepage hero; video + poster only
- [ ] Align spacing, card patterns, and CTA repetition with reference UX
- [ ] Keep existing `.anim-on-scroll` behavior

### 2.2 Navbar
- [ ] Desktop: logo | links | phone | primary CTA
- [ ] Scroll state: transparent → solid white with shadow
- [ ] Mobile: overlay/slide menu with links + phone + CTA inside
- [ ] Correct z-index over video/hero

### 2.3 Service pages
- [ ] Breadcrumb, strong H1, problem → method → process → FAQ → area chips → CTA
- [ ] Consistent with Hiddekel depth; keep T.E.G copy

### 2.4 About / FAQ / Contact
- [ ] About: story + non-negotiables + city list
- [ ] FAQ: grouped Q&A matching real booking objections
- [ ] Contact: NAP + form + click-to-call; form posts to existing `/api/contact`

### 2.5 Areas hub
- [ ] `areas.html` lists all 12 with short blurbs linking to service-areas/*

**Exit criteria Phase 2:** Homepage section flow matches brief; city template matches Hiddekel order; nav parity on mobile/desktop; no broken internal city links.

---

## Phase 3 — SEO, GMB, performance, polish

### 3.1 On-page SEO
- [ ] Unique title + meta description every page (city pages include city + primary service)
- [ ] Single H1, logical H2/H3
- [ ] Internal links: city ↔ city, service ↔ city
- [ ] Canonical tags correct

### 3.2 GMB alignment
- [ ] NAP string identical to Google Business Profile
- [ ] Service areas on site ⊆ GMB service area
- [ ] tel: links use exact GMB number

### 3.3 Performance
- [ ] Compress hero.mp4 or provide lighter mobile source / strong poster
- [ ] Lazy-load below-fold images only (never hero video)
- [ ] font-display: swap; avoid blocking CSS where possible
- [ ] Target LCP &lt; 2.5s, CLS ~0 on home + one city page

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

## Status log

| Date | Phase | Notes |
|------|-------|-------|
| 2026-09-17 | 0 | Audit + plan written |
| 2026-09-17 | 1+2 | Implementation started (this commit series) |

---

*Owner: rebuild against Hiddekel architecture for T.E.G branding and Milwaukee local SEO / GMB readiness.*
