/**
 * T.E.G Carpet Steam Cleaning — Backend
 * Contact form, admin content API, media upload, static site
 */
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'teg2026';
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure folders exist
[DATA_DIR, UPLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

const DEFAULT_CONTENT = {
  seo: {
    title: 'T.E.G Carpet Steam Cleaning | Professional Carpet & Furniture Cleaning in Milwaukee',
    description: 'Professional carpet, couch, tile & steam cleaning services by T.E.G in Milwaukee, WI.',
    keywords: 'carpet cleaning Milwaukee, steam cleaning, tile grout cleaning, couch cleaning',
    canonical: 'https://tegcarpetsteamcleaning.com/',
    ogTitle: 'T.E.G Carpet Steam Cleaning | Milwaukee',
    ogDescription: 'Professional carpet & steam cleaning in Milwaukee, WI.',
    ogImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    twitterTitle: 'T.E.G Carpet Steam Cleaning | Milwaukee',
    twitterDescription: 'Professional carpet & steam cleaning in Milwaukee, WI.',
    twitterImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80'
  },
  media: {
    video: 'https://videos.pexels.com/video-files/6195186/6195186-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80',
    og: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    about: ''
  },
  services: [
    { name: 'Carpet Cleaning', description: 'Deep extraction carpet cleaning that restores color, softness, and freshness.', seoTitle: 'Carpet Cleaning Milwaukee | T.E.G', seoDescription: 'Professional carpet cleaning in Milwaukee, WI.' },
    { name: 'Tile & Grout Cleaning', description: 'Powerful cleaning for tile and grout. Restores shine and hygiene.', seoTitle: 'Tile & Grout Cleaning Milwaukee', seoDescription: 'Tile and grout cleaning in Milwaukee by T.E.G.' },
    { name: 'Couch Cleaning', description: 'Upholstery and sofa cleaning for stains, dust, allergens and odors.', seoTitle: 'Couch Cleaning Milwaukee | T.E.G', seoDescription: 'Professional couch cleaning in Milwaukee.' },
    { name: 'Steam Cleaning', description: 'High-temperature steam sanitizes carpets and surfaces naturally.', seoTitle: 'Steam Cleaning Milwaukee | T.E.G', seoDescription: 'Steam carpet cleaning in Milwaukee.' },
    { name: 'Carpet Stain Removal', description: 'Specialized treatment for coffee, wine, ink and pet accidents.', seoTitle: 'Carpet Stain Removal Milwaukee', seoDescription: 'Expert carpet stain removal in Milwaukee, WI.' },
    { name: 'Commercial Carpet Cleaning', description: 'Reliable cleaning for offices, shops and commercial properties.', seoTitle: 'Commercial Carpet Cleaning Milwaukee', seoDescription: 'Commercial carpet cleaning in Milwaukee.' }
  ],
  location: {
    name: 'T.E.G Carpet Steam Cleaning',
    city: 'Milwaukee',
    address: '4111 N Port Washington Rd suite 1, Milwaukee, WI 53217, United States',
    region: 'WI',
    postal: '53217',
    lat: '43.118',
    lng: '-87.906',
    geoRegion: 'US-WI'
  },
  contact: {
    phone: '+1 (414) 775-3705',
    whatsapp: '16184340858',
    email: 'contact@teg-carpetsteamcleaning.com',
    address: '4111 N Port Washington Rd suite 1, Milwaukee, WI 53217, United States',
    hours: 'Monday – Sunday 08:00 AM – 07:00 PM'
  }
};

function readJSON(file, fallback) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error('readJSON', file, e.message);
  }
  return fallback;
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

if (!fs.existsSync(CONTENT_FILE)) writeJSON(CONTENT_FILE, DEFAULT_CONTENT);
if (!fs.existsSync(SUBMISSIONS_FILE)) writeJSON(SUBMISSIONS_FILE, []);

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Uploaded media
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer for media uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^(image|video)\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images and videos allowed'));
  }
});

// ——— Public API ———

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'T.E.G Backend', time: new Date().toISOString() });
});

// Public content (for site / future dynamic use)
app.get('/api/content', (_req, res) => {
  res.json(readJSON(CONTENT_FILE, DEFAULT_CONTENT));
});

// Contact / quote form
app.post('/api/contact', (req, res) => {
  const { name, phone, email, service, message } = req.body || {};
  if (!name || !phone || !email) {
    return res.status(400).json({ ok: false, error: 'Name, phone and email are required.' });
  }
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email).trim(),
    service: String(service || '').trim(),
    message: String(message || '').trim(),
    createdAt: new Date().toISOString(),
    read: false
  };
  const list = readJSON(SUBMISSIONS_FILE, []);
  list.unshift(entry);
  writeJSON(SUBMISSIONS_FILE, list);
  console.log('[quote]', entry.email, entry.service || '-');
  res.json({ ok: true, message: 'Quote request received. We will contact you soon.', id: entry.id });
});

// ——— Admin auth helper ———
function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.key || (req.body && req.body.password);
  if (key === ADMIN_PASSWORD) return next();
  return res.status(401).json({ ok: false, error: 'Unauthorized' });
}

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    return res.json({ ok: true, token: ADMIN_PASSWORD });
  }
  res.status(401).json({ ok: false, error: 'Wrong password' });
});

// Get full content (admin)
app.get('/api/admin/content', requireAdmin, (_req, res) => {
  res.json({ ok: true, data: readJSON(CONTENT_FILE, DEFAULT_CONTENT) });
});

// Save content (admin)
app.put('/api/admin/content', requireAdmin, (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid content' });
  }
  writeJSON(CONTENT_FILE, data);
  res.json({ ok: true, message: 'Content saved' });
});

// List submissions
app.get('/api/admin/submissions', requireAdmin, (_req, res) => {
  res.json({ ok: true, data: readJSON(SUBMISSIONS_FILE, []) });
});

// Mark submission read / delete
app.patch('/api/admin/submissions/:id', requireAdmin, (req, res) => {
  const list = readJSON(SUBMISSIONS_FILE, []);
  const i = list.findIndex((s) => s.id === req.params.id);
  if (i < 0) return res.status(404).json({ ok: false, error: 'Not found' });
  if (req.body.read !== undefined) list[i].read = !!req.body.read;
  writeJSON(SUBMISSIONS_FILE, list);
  res.json({ ok: true, data: list[i] });
});

app.delete('/api/admin/submissions/:id', requireAdmin, (req, res) => {
  let list = readJSON(SUBMISSIONS_FILE, []);
  list = list.filter((s) => s.id !== req.params.id);
  writeJSON(SUBMISSIONS_FILE, list);
  res.json({ ok: true });
});

// Media upload
app.post('/api/admin/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: 'No file' });
  const url = '/uploads/' + req.file.filename;
  res.json({ ok: true, url, filename: req.file.filename });
});

// Static website (after API routes)
app.use(express.static(__dirname));

// SPA-ish fallback for unknown paths → 404 page simple
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('T.E.G server running on http://localhost:' + PORT);
  console.log('Admin password: (set ADMIN_PASSWORD env or default teg2026)');
});
