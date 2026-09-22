/**
 * T.E.G live-site config + forceUI
 */
(function () {
  const CACHE_KEY = 'teg_site_content_v2';
  const CACHE_TTL = 60 * 1000;

  // Inject SMS float styles (works even if styles.css still has only .whatsapp-float)
  if (!document.getElementById('teg-sms-css')) {
    var st = document.createElement('style');
    st.id = 'teg-sms-css';
    st.textContent = '.sms-float{position:fixed;bottom:28px;right:28px;z-index:999;width:60px;height:60px;background:#0ea5e9;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(14,165,233,.45);transition:transform .35s,box-shadow .3s}.sms-float svg{width:28px;height:28px}.sms-float:hover{transform:scale(1.14);box-shadow:0 10px 32px rgba(14,165,233,.55)}.whatsapp-float{background:#0ea5e9!important;box-shadow:0 6px 24px rgba(14,165,233,.45)!important}';
    (document.head || document.documentElement).appendChild(st);
  }

  function nonempty(v) {
    return v != null && String(v).trim() !== '';
  }

  function setMeta(name, content, attr) {
    if (!nonempty(content)) return;
    attr = attr || 'name';
    let el = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setLinkRel(rel, href) {
    if (!nonempty(href)) return;
    let el = document.querySelector('link[rel="' + rel + '"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  function setAllText(selector, text) {
    if (!nonempty(text)) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = text;
    });
  }

  function telHref(phone, phoneTel) {
    if (nonempty(phoneTel)) return 'tel:' + phoneTel.replace(/\s/g, '');
    if (!nonempty(phone)) return '';
    return 'tel:' + phone.replace(/[^\d+]/g, '');
  }

  function applyBranding(b, media) {
    if (!b && !media) return;
    b = b || {};
    media = media || {};
    if (nonempty(b.logoMark)) setAllText('.logo-mark', b.logoMark);
    if (nonempty(b.logoText)) setAllText('.logo-text', b.logoText);
  }

  function applyContact(c) {
    if (!c) return;
    const tel = telHref(c.phone, c.phoneTel) || 'tel:+14147753705';
    document.querySelectorAll('a.phone-link, a.phone-shake, a[href^="tel:"]').forEach(function (a) {
      if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
      a.setAttribute('href', tel);
      a.textContent = 'Call Now';
    });
    document.querySelectorAll('a.sms-float, a.whatsapp-float, a[href*="wa.me"], a[href^="sms:"]').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
      a.classList.add('sms-float');
      a.setAttribute('aria-label', 'Text us');
      a.removeAttribute('target');
    });
  }

  function applyMedia(m, pageMedia) {
    if (!m) m = {};
    pageMedia = pageMedia || {};
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    if (path === '' || path === '/') path = 'index.html';
    var page = pageMedia[path] || {};
    const video = nonempty(page.heroVideo) ? page.heroVideo : (nonempty(m.heroVideo) ? m.heroVideo : '');
    const poster = nonempty(page.heroImage) ? page.heroImage : (nonempty(m.heroPoster) ? m.heroPoster : '');
    const vid = document.querySelector('video.hero-video');
    if (vid && nonempty(video)) {
      var src = vid.querySelector('source');
      if (src) { src.setAttribute('src', video); vid.load(); }
      else vid.src = video;
    }
    var ba = page.beforeAfter || m.beforeAfter;
    if (ba) {
      document.querySelectorAll('[data-placeholder="before"]').forEach(function (el) {
        if (nonempty(ba.before)) el.style.backgroundImage = 'url(' + ba.before + ')';
      });
      document.querySelectorAll('[data-placeholder="after"]').forEach(function (el) {
        if (nonempty(ba.after)) el.style.backgroundImage = 'url(' + ba.after + ')';
      });
    }
  }

  function forceUI() {
    // Phone -> Call Now
    document.querySelectorAll('a[href^="tel:"], a.phone-link, a.phone-shake').forEach(function (a) {
      if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
      a.setAttribute('href', 'tel:+14147753705');
      var t = (a.textContent || '').trim();
      if (t.indexOf('414') !== -1 || t.indexOf('Call') === 0 || /^\+?[\d\s().-]{7,}$/.test(t) || t === 'Call Now') {
        a.textContent = 'Call Now';
      }
    });
    // WhatsApp -> SMS
    document.querySelectorAll('a.whatsapp-float, a[href*="wa.me"]').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
      a.classList.add('sms-float');
      a.setAttribute('aria-label', 'Text us');
      a.removeAttribute('target');
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7V9zm0-3h10v2H7V6zm0 6h7v2H7v-2z"/></svg>';
    });
    document.querySelectorAll('a.sms-float').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
    });
    // Quote -> Estimate
    document.querySelectorAll('a.btn, button.btn, h3').forEach(function (el) {
      var t = el.textContent || '';
      if (/Get a Free Quote/i.test(t)) el.textContent = t.replace(/Get a Free Quote/ig, 'Get a Free Estimate');
      else if (/Get a Quote/i.test(t)) el.textContent = t.replace(/Get a Quote/ig, 'Get an Estimate');
      else if (/Request a Quote/i.test(t)) el.textContent = t.replace(/Request a Quote/ig, 'Request an Estimate');
      else if (/Get My Quote/i.test(t)) el.textContent = t.replace(/Get My Quote/ig, 'Get My Estimate');
      else if (/Request a Free Quote/i.test(t)) el.textContent = t.replace(/Request a Free Quote/ig, 'Request a Free Estimate');
    });
    // Hours 24/7
    document.querySelectorAll('.stat').forEach(function (el) {
      var s = el.querySelector('strong');
      if (s && /Mon/i.test(s.textContent || '')) {
        s.textContent = '24/7';
        var sp = el.querySelector('span');
        if (sp) sp.textContent = 'Always open';
      }
    });
    document.querySelectorAll('.contact-item').forEach(function (el) {
      if (/Hours/i.test(el.innerHTML || '')) {
        var sp = el.querySelector('span');
        if (sp) sp.innerHTML = '24/7 — Always Available';
      }
    });
    // Logo
    document.querySelectorAll('.logo-text').forEach(function (el) {
      if ((el.textContent || '').indexOf('Furniture') === -1) {
        el.textContent = 'Carpet & Furniture Steam Cleaning';
      }
    });
  }

  function applyAll(data) {
    try {
      if (data) {
        applyBranding(data.branding, data.media);
        applyContact(data.contact);
        applyMedia(data.media, data.pageMedia);
      }
    } catch (e) { console.warn('[TEG]', e); }
    forceUI();
  }

  async function loadContent() {
    try {
      var res = await fetch('/api/content', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('no api');
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  loadContent().then(applyAll);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', forceUI);
  else forceUI();
  setTimeout(forceUI, 400);
  setTimeout(forceUI, 1200);
  window.TEG_SITE = { loadContent: loadContent, applyAll: applyAll, forceUI: forceUI };
})();
