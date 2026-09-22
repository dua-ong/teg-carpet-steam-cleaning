/**
 * T.E.G live-site config applicator
 * Loads /api/content (or cached). If a field is set (uploaded/saved), it overrides the page.
 * If empty, keeps whatever is already in the HTML (defaults).
 */
(function () {
  const CACHE_KEY = 'teg_site_content_v2';
  const CACHE_TTL = 60 * 1000;

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
    const digits = phone.replace(/[^\d+]/g, '');
    return 'tel:' + digits;
  }

  function applyBranding(b, media) {
    if (!b && !media) return;
    b = b || {};
    media = media || {};
    const logoUrl = nonempty(media.logo) ? media.logo : (nonempty(b.logoUrl) ? b.logoUrl : '');
    const favicon = nonempty(media.favicon) ? media.favicon : (nonempty(b.faviconUrl) ? b.faviconUrl : '');
    if (nonempty(favicon)) setLinkRel('icon', favicon);
    if (nonempty(logoUrl)) {
      document.querySelectorAll('a.logo').forEach(function (a) {
        var mark = a.querySelector('.logo-mark');
        var text = a.querySelector('.logo-text');
        if (!a.querySelector('img.logo-img')) {
          var img = document.createElement('img');
          img.className = 'logo-img';
          img.alt = b.siteName || 'Logo';
          img.style.maxHeight = '40px';
          img.style.width = 'auto';
          img.style.display = 'block';
          a.insertBefore(img, a.firstChild);
        }
        var imgEl = a.querySelector('img.logo-img');
        if (imgEl) {
          imgEl.src = logoUrl;
          if (mark) mark.style.display = 'none';
          if (text) text.style.display = 'none';
        }
      });
    } else {
      if (nonempty(b.logoMark)) setAllText('.logo-mark', b.logoMark);
      if (nonempty(b.logoText)) setAllText('.logo-text', b.logoText);
    }
  }

  function applyContact(c) {
    if (!c) return;
    const tel = telHref(c.phone, c.phoneTel);
    if (nonempty(c.phone) || nonempty(c.phoneTel)) {
      document.querySelectorAll('a.phone-link, a.phone-shake, a[href^="tel:"]').forEach(function (a) {
        if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
        if (tel) a.setAttribute('href', tel);
        a.textContent = 'Call Now';
      });
    }
    var smsHref = 'sms:+14147753705';
    document.querySelectorAll('a.sms-float, a.whatsapp-float, a[href*="wa.me"], a[href^="sms:"]').forEach(function (a) {
      a.setAttribute('href', smsHref);
      a.classList.remove('whatsapp-float');
      a.classList.add('sms-float');
      a.setAttribute('aria-label', 'Text us');
      a.removeAttribute('target');
    });
    if (nonempty(c.email)) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
        a.setAttribute('href', 'mailto:' + c.email);
        if ((a.textContent || '').indexOf('@') !== -1) a.textContent = c.email;
      });
    }
    if (nonempty(c.hours)) {
      document.querySelectorAll('[data-teg="hours"]').forEach(function (el) {
        el.textContent = c.hours;
      });
    }
  }

  function applyMedia(m, pageMedia) {
    if (!m) m = {};
    pageMedia = pageMedia || {};
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    if (path === '' || path === '/') path = 'index.html';
    var page = pageMedia[path] || {};
    const video = nonempty(page.heroVideo) ? page.heroVideo : (nonempty(m.heroVideo) ? m.heroVideo : '');
    const poster = nonempty(page.heroImage) ? page.heroImage : (nonempty(page.heroPoster) ? page.heroPoster : (nonempty(m.heroPoster) ? m.heroPoster : ''));
    const vid = document.querySelector('video.hero-video');
    const bgImg = document.getElementById('heroBgImage');
    if (vid) {
      if (nonempty(video)) {
        vid.style.display = '';
        if (bgImg) bgImg.style.display = 'none';
        if (nonempty(poster)) vid.setAttribute('poster', poster);
        else vid.removeAttribute('poster');
        var src = vid.querySelector('source');
        if (src) { src.setAttribute('src', video); vid.load(); }
        else { vid.src = video; }
        var play = vid.play();
        if (play && play.catch) play.catch(function () {});
      } else if (nonempty(poster)) {
        vid.style.display = 'none';
        if (bgImg) {
          bgImg.style.display = 'block';
          bgImg.style.backgroundImage = 'url(' + poster + ')';
        }
      } else {
        vid.style.display = 'none';
        if (bgImg) bgImg.style.display = 'none';
      }
    } else if (nonempty(poster)) {
      var ph = document.querySelector('.page-hero');
      if (ph) {
        ph.style.backgroundImage = 'linear-gradient(rgba(10,61,107,0.75), rgba(10,61,107,0.75)), url(' + poster + ')';
        ph.style.backgroundSize = 'cover';
        ph.style.backgroundPosition = 'center';
      }
    }
    if (nonempty(m.aboutImage) || nonempty(m.about)) {
      const aboutSrc = m.aboutImage || m.about;
      document.querySelectorAll('[data-teg="about-image"], img.about-image').forEach(function (img) {
        img.src = aboutSrc;
      });
    }
    var ba = page.beforeAfter || m.beforeAfter;
    if (ba && (ba.before || ba.after)) {
      document.querySelectorAll('[data-placeholder="before"]').forEach(function (el) {
        if (nonempty(ba.before)) {
          if (el.tagName === 'IMG') el.src = ba.before;
          else el.style.backgroundImage = 'url(' + ba.before + ')';
        }
      });
      document.querySelectorAll('[data-placeholder="after"]').forEach(function (el) {
        if (nonempty(ba.after)) {
          if (el.tagName === 'IMG') el.src = ba.after;
          else el.style.backgroundImage = 'url(' + ba.after + ')';
        }
      });
    }
  }

  function applySeo(seo, media) {
    if (!seo) return;
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    if (path === '' || path === 'index.html' || path === '/') {
      if (nonempty(seo.title)) document.title = seo.title;
      if (nonempty(seo.description)) setMeta('description', seo.description);
      if (nonempty(seo.keywords)) setMeta('keywords', seo.keywords);
      if (nonempty(seo.canonical)) setLinkRel('canonical', seo.canonical);
    }
  }

  function applyPageSeo(pages) {
    if (!pages || typeof pages !== 'object') return;
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    var p = pages[path] || pages['/' + path];
    if (!p) return;
    if (nonempty(p.title)) document.title = p.title;
    if (nonempty(p.description)) setMeta('description', p.description);
  }

  function applyNav(nav) {
    if (!nav) return;
  }

  function forceUI() {
    document.querySelectorAll('a[href^="tel:"], a.phone-link, a.phone-shake').forEach(function (a) {
      if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
      a.setAttribute('href', 'tel:+14147753705');
      var t = (a.textContent || '').trim();
      if (t.indexOf('414') !== -1 || t.indexOf('Call') === 0 || /^\+?[\d\s().-]{7,}$/.test(t) || t === 'Call Now') {
        a.textContent = 'Call Now';
      }
    });
    document.querySelectorAll('a.whatsapp-float, a[href*="wa.me"]').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
      a.classList.remove('whatsapp-float');
      a.classList.add('sms-float');
      a.setAttribute('aria-label', 'Text us');
      a.removeAttribute('target');
      if ((a.innerHTML || '').indexOf('M16.004') !== -1) {
        a.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7V9zm0-3h10v2H7V6zm0 6h7v2H7v-2z"/></svg>';
      }
    });
    document.querySelectorAll('a.sms-float').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
      a.setAttribute('aria-label', 'Text us');
    });
    document.querySelectorAll('a.btn, button.btn, h3').forEach(function (el) {
      var t = el.textContent || '';
      if (/Get a Free Quote/i.test(t)) el.textContent = t.replace(/Get a Free Quote/ig, 'Get a Free Estimate');
      else if (/Get a Quote/i.test(t)) el.textContent = t.replace(/Get a Quote/ig, 'Get an Estimate');
      else if (/Request a Quote/i.test(t)) el.textContent = t.replace(/Request a Quote/ig, 'Request an Estimate');
      else if (/Get My Quote/i.test(t)) el.textContent = t.replace(/Get My Quote/ig, 'Get My Estimate');
      else if (/Request a Free Quote/i.test(t)) el.textContent = t.replace(/Request a Free Quote/ig, 'Request a Free Estimate');
    });
    document.querySelectorAll('.stat, .contact-item, [data-teg="hours"]').forEach(function (el) {
      var html = el.innerHTML || '';
      if (/8:00|08:00|Mon.?Sun|Monday.?Sunday/i.test(html)) {
        if (el.querySelector('strong') && /Mon/i.test(el.querySelector('strong').textContent || '')) {
          el.querySelector('strong').textContent = '24/7';
          var span = el.querySelector('span');
          if (span) span.textContent = 'Always open';
        } else if (/Hours/i.test(html)) {
          var span2 = el.querySelector('span');
          if (span2) span2.innerHTML = '24/7 — Always Available';
        }
      }
    });
    document.querySelectorAll('.logo-text').forEach(function (el) {
      if ((el.textContent || '').indexOf('Furniture') === -1) {
        el.textContent = 'Carpet & Furniture Steam Cleaning';
      }
    });
  }

  function applyAll(data) {
    if (!data) { forceUI(); return; }
    try {
      applyBranding(data.branding, data.media);
      applyContact(data.contact);
      applyMedia(data.media, data.pageMedia);
      applySeo(data.seo, data.media);
      applyPageSeo(data.pages);
      applyNav(data.nav);
      forceUI();
    } catch (e) {
      console.warn('[TEG config]', e);
      forceUI();
    }
  }

  async function loadContent() {
    try {
      var cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        var parsed = JSON.parse(cached);
        if (parsed && parsed._ts && Date.now() - parsed._ts < CACHE_TTL) {
          return parsed.data;
        }
      }
    } catch (e) {}
    try {
      var res = await fetch('/api/content', { credentials: 'same-origin' });
      if (!res.ok) throw new Error('no api');
      var data = await res.json();
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ _ts: Date.now(), data: data }));
      } catch (e) {}
      return data;
    } catch (e) {
      try {
        var local = localStorage.getItem('teg_content');
        if (local) return JSON.parse(local);
      } catch (e2) {}
      return null;
    }
  }

  loadContent().then(function (d) { applyAll(d); forceUI(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', forceUI);
  else forceUI();
  setTimeout(forceUI, 500);
  setTimeout(forceUI, 1500);
  window.TEG_SITE = { loadContent: loadContent, applyAll: applyAll, forceUI: forceUI };
})();
