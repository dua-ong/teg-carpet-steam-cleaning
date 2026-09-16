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

[DATA_DIR, UPLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

const DEFAULT_CONTENT = {
  branding: {
    siteName: 'T.E.G Carpet & Furniture Steam Cleaning',
    logoMark: 'T.E.G',
    logoText: 'Carpet Steam Cleaning',
    logoUrl: '',
    faviconUrl: ''
  },
  seo: {
    title: 'T.E.G Carpet Steam Cleaning | Professional Carpet & Furniture Cleaning in Milwaukee',
    description: 'Professional carpet, couch, tile & steam cleaning services by T.E.G Carpet & Furniture Steam Cleaning in Milwaukee, WI. Serving 12 western suburbs.',
    keywords: 'carpet cleaning Milwaukee, steam cleaning Milwaukee, tile grout cleaning, couch cleaning, upholstery cleaning, pet odor removal, commercial carpet cleaning',
    canonical: 'https://tegcarpetsteamcleaning.com/',
    ogTitle: 'T.E.G Carpet Steam Cleaning | Milwaukee',
    ogDescription: 'Professional carpet & steam cleaning in Milwaukee, WI. Upfront pricing, kid & pet safe.',
    ogImage: '',
    twitterTitle: 'T.E.G Carpet Steam Cleaning | Milwaukee',
    twitterDescription: 'Professional carpet & steam cleaning in Milwaukee, WI.',
    twitterImage: ''
  },
  media: {
    heroVideo: '',
    heroPoster: '',
    ogImage: '',
    aboutImage: '',
    logo: '',
    favicon: '',
    video: '',
    poster: '',
    og: '',
    about: ''
  },
  contact: {
    phone: '+1 (414) 775-3705',
    phoneTel: '+14147753705',
    whatsapp: '+1 (618) 434-0858',
    whatsappDigits: '16184340858',
    email: 'contact@teg-carpetsteamcleaning.com',
    address: '4111 N Port Washington Rd suite 1, Milwaukee, WI 53217',
    addressLine1: '4111 N Port Washington Rd suite 1',
    city: 'Milwaukee',
    region: 'WI',
    postal: '53217',
    hours: 'Monday – Sunday 08:00 AM – 07:00 PM'
  },
  location: {
    name: 'T.E.G Carpet & Furniture Steam Cleaning',
    city: 'Milwaukee',
    address: '4111 N Port Washington Rd suite 1, Milwaukee, WI 53217, United States',
    region: 'WI',
    postal: '53217',
    lat: '43.0895',
    lng: '-87.8910',
    geoRegion: 'US-WI'
  },
  nav: {
    main: [
      { label: 'Home', href: 'index.html' },
      { label: 'Services', href: 'services.html' },
      { label: 'Areas We Serve', href: 'areas.html' },
      { label: 'About', href: 'about.html' },
      { label: 'FAQ', href: 'faq.html' },
      { label: 'Contact', href: 'contact.html' }
    ],
    footer: [
      { label: 'Home', href: 'index.html' },
      { label: 'Services', href: 'services.html' },
      { label: 'Areas We Serve', href: 'areas.html' },
      { label: 'About', href: 'about.html' },
      { label: 'FAQ', href: 'faq.html' },
      { label: 'Contact', href: 'contact.html' }
    ],
    services: [
      { label: 'Carpet Cleaning', href: 'service-carpet-cleaning.html' },
      { label: 'Tile & Grout', href: 'service-tile-grout.html' },
      { label: 'Upholstery', href: 'service-couch-cleaning.html' },
      { label: 'Steam Cleaning', href: 'service-steam-cleaning.html' },
      { label: 'Pet Odor & Stain', href: 'service-stain-removal.html' },
      { label: 'Commercial', href: 'service-commercial.html' }
    ]
  },
  services: [
    {
      name: 'Carpet Cleaning',
      description: 'Deep extraction carpet cleaning that restores color, softness, and freshness.',
      href: 'service-carpet-cleaning.html',
      seoTitle: 'Carpet Cleaning Milwaukee | T.E.G',
      seoDescription: 'Professional carpet cleaning in Milwaukee, WI.',
      seoKeywords: 'carpet cleaning Milwaukee, deep carpet clean'
    },
    {
      name: 'Tile & Grout Cleaning',
      description: 'Powerful cleaning for tile and grout. Restores shine and hygiene.',
      href: 'service-tile-grout.html',
      seoTitle: 'Tile & Grout Cleaning Milwaukee',
      seoDescription: 'Tile and grout cleaning in Milwaukee by T.E.G.',
      seoKeywords: 'tile cleaning Milwaukee, grout cleaning'
    },
    {
      name: 'Upholstery / Couch Cleaning',
      description: 'Upholstery and sofa cleaning for stains, dust, allergens and odors.',
      href: 'service-couch-cleaning.html',
      seoTitle: 'Couch Cleaning Milwaukee | T.E.G',
      seoDescription: 'Professional couch cleaning in Milwaukee.',
      seoKeywords: 'couch cleaning Milwaukee'
    },
    {
      name: 'Steam Cleaning',
      description: 'High-temperature steam sanitizes carpets and surfaces naturally.',
      href: 'service-steam-cleaning.html',
      seoTitle: 'Steam Cleaning Milwaukee | T.E.G',
      seoDescription: 'Steam carpet cleaning in Milwaukee.',
      seoKeywords: 'steam cleaning Milwaukee'
    },
    {
      name: 'Pet Odor & Stain Removal',
      description: 'Specialized treatment for pet accidents and set-in stains.',
      href: 'service-stain-removal.html',
      seoTitle: 'Pet Odor & Stain Removal Milwaukee',
      seoDescription: 'Expert pet odor and stain removal in Milwaukee, WI.',
      seoKeywords: 'pet odor removal Milwaukee'
    },
    {
      name: 'Commercial Carpet Cleaning',
      description: 'Reliable cleaning for offices, shops and commercial properties.',
      href: 'service-commercial.html',
      seoTitle: 'Commercial Carpet Cleaning Milwaukee',
      seoDescription: 'Commercial carpet cleaning in Milwaukee.',
      seoKeywords: 'commercial carpet cleaning Milwaukee'
    }
  ],
  pages: {}
};

function deepMerge(base, override) {
  if (!override || typeof override !== 'object') return base;
  const out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
  Object.keys(override).forEach((k) => {
    if (
      override[k] &&
      typeof override[k] === 'object' &&
      !Array.isArray(override[k]) &&
      base[k] &&
      typeof base[k] === 'object' &&
      !Array.isArray(base[k])
    ) {
      out[k] = deepMerge(base[k], override[k]);
    } else if (override[k] !== undefined) {
      out[k] = override[k];
    }
  });
  return out;
}

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

function getContent() {
  const stored = readJSON(CONTENT_FILE, null);
  if (!stored) return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  return deepMerge(DEFAULT_CONTENT, stored);
}

if (!fs.existsSync(CONTENT_FILE)) writeJSON(CONTENT_FILE, DEFAULT_CONTENT);
if (!fs.existsSync(SUBMISSIONS_FILE)) writeJSON(SUBMISSIONS_FILE, []);

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, Date.now() + '-' + safe);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^(image|video)\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only images and videos allowed'));
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'T.E.G Backend', time: new Date().toISOString() });
});

app.get('/api/content', (_req, res) => {
  res.json(getContent());
});

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

app.get('/api/admin/content', requireAdmin, (_req, res) => {
  res.json({ ok: true, data: getContent() });
});

app.put('/api/admin/content', requireAdmin, (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid content' });
  }
  writeJSON(CONTENT_FILE, data);
  res.json({ ok: true, message: 'Content saved' });
});

app.get('/api/admin/submissions', requireAdmin, (_req, res) => {
  res.json({ ok: true, data: readJSON(SUBMISSIONS_FILE, []) });
});

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

app.post('/api/admin/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: 'No file' });
  const url = '/uploads/' + req.file.filename;
  res.json({ ok: true, url, filename: req.file.filename });
});

app.use(express.static(__dirname));

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found' });
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('T.E.G server running on http://localhost:' + PORT);
  console.log('Admin: set ADMIN_PASSWORD env or default teg2026');
});
