# T.E.G Carpet Steam Cleaning — Full Website + Backend

Premium multi-page site for **T.E.G Carpet & Furniture Steam Cleaning** (Milwaukee, WI) with a **Node.js backend**.

## Backend features
- **POST /api/contact** — quote form saves to `data/submissions.json`
- **GET/PUT /api/admin/content** — SEO, media, services, location, contact
- **GET /api/admin/submissions** — view quote requests in admin
- **POST /api/admin/upload** — real file upload to `/uploads`
- Serves all static HTML/CSS/JS

## Run locally
```bash
npm install
npm start
```
Open: **http://localhost:3000**

Admin: **http://localhost:3000/admin.html**  
Password: **teg2026** (or set `ADMIN_PASSWORD` env)

```bash
ADMIN_PASSWORD=yourpass PORT=3000 npm start
```

## Deploy
1. Upload project to a VPS / Railway / Render / any Node host
2. `npm install && npm start`
3. Point domain to the server port (or reverse proxy with Nginx)

**Important:** Backend must be running for form save + admin server save. Without server, form falls back to mailto.

## Pages
| File | Description |
|------|-------------|
| `index.html` | Homepage |
| `services.html` | All services |
| `service-*.html` | Individual service detail pages |
| `about.html` / `contact.html` / `areas.html` | Inner pages |
| `admin.html` | Admin panel |

## API summary
| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | — |
| GET | `/api/content` | — |
| POST | `/api/contact` | — |
| POST | `/api/admin/login` | password body |
| GET/PUT | `/api/admin/content` | header `x-admin-key` |
| GET | `/api/admin/submissions` | header `x-admin-key` |
| POST | `/api/admin/upload` | header `x-admin-key` + multipart file |

## Business
- Phone: +1 (414) 775-3705
- WhatsApp: +1 (618) 434-0858
- Email: contact@teg-carpetsteamcleaning.com
- Address: 4111 N Port Washington Rd suite 1, Milwaukee, WI 53217
