/**
 * T.E.G live-site config applicator
 * Loads /api/content (or cached). If a field is set (uploaded/saved), it overrides the page.
 * If empty, keeps whatever is already in the HTML (defaults).
 */
(function () {
  const CACHE_KEY = 'teg_site_content_v2';
  const CACHE_TTL = 60 * 1000; // 1 min client cache

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

  function waHref(digits, display) {
    const d = nonempty(digits) ? String(digits).replace(/\D/g, '') : '';
    if (d) return 'https://wa.me/' + d;
    if (nonempty(display)) return 'https://wa.me/' + String(display).replace(/\D/g, '');
    return '';
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
    const wa = waHref(c.whatsappDigits, c.whatsapp);

    if (nonempty(c.phone)) {
      document.querySelectorAll('a.phone-link, a.phone-shake').forEach(function (a) {
        if (a.closest && a.closest('.whatsapp-float')) return;
        if (tel) a.setAttribute('href', tel);
        if (/^\+?[\d\s().-]{7,}$/.test((a.textContent || '').trim()) || (a.textContent || '').indexOf('414') !== -1) {
          a.textContent = c.phone;
        }
      });
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        if (tel) a.setAttribute('href', tel);
        var t = (a.textContent || '').trim();
        if (t.indexOf('414') !== -1 || t.indexOf('Call') === 0 || /^\+?[\d\s().-]{7,}$/.test(t)) {
          if (t.indexOf('Call') === 0) a.textContent = 'Call ' + c.phone;
          else if (/^\+?[\d\s().-]{7,}$/.test(t)) a.textContent = c.phone;
        }
      });
    }

    if (wa) {
      document.querySelectorAll('a.whatsapp-float, a[href*="wa.me"]').forEach(function (a) {
        a.setAttribute('href', wa);
      });
    }

    if (nonempty(c.email)) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
        a.setAttribute('href', 'mailto:' + c.email);
        if ((a.textContent || '').indexOf('@') !== -1) a.textContent = c.email;
      });
    }

    if (nonempty(c.address) || nonempty(c.addressLine1)) {
      const addr = c.address || [c.addressLine1, c.city, c.region, c.postal].filter(Boolean).join(', ');
      document.querySelectorAll('[data-teg="address"]').forEach(function (el) {
        el.innerHTML = addr.replace(/, /g, '<br />');
      });
    }

    if (nonempty(c.hours)) {
      document.querySelectorAll('[data-teg="hours"]').forEach(function (el) {
        el.textContent = c.hours;
      });
    }
  }

  function applyMedia(m) {
    if (!m) return;
    const video = nonempty(m.heroVideo) ? m.heroVideo : (nonempty(m.video) ? m.video : '');
    const poster = nonempty(m.heroPoster) ? m.heroPoster : (nonempty(m.poster) ? m.poster : '');

    const vid = document.querySelector('video.hero-video');
    if (vid) {
      // Homepage: never keep a stock/Unsplash poster unless admin explicitly uploaded one
      if (nonempty(poster)) {
        vid.setAttribute('poster', poster);
      } else {
        vid.removeAttribute('poster');
      }
      if (nonempty(video)) {
        var src = vid.querySelector('source');
        if (src) {
          src.setAttribute('src', video);
          vid.load();
        } else {
          vid.src = video;
        }
      }
    }

    if (nonempty(m.aboutImage) || nonempty(m.about)) {
      const aboutSrc = m.aboutImage || m.about;
      document.querySelectorAll('[data-teg="about-image"], img.about-image').forEach(function (img) {
        img.src = aboutSrc;
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
      if (nonempty(seo.ogTitle)) setMeta('og:title', seo.ogTitle, 'property');
      if (nonempty(seo.ogDescription)) setMeta('og:description', seo.ogDescription, 'property');
      var ogImg = nonempty(seo.ogImage) ? seo.ogImage : (media && (media.ogImage || media.og));
      if (nonempty(ogImg)) setMeta('og:image', ogImg, 'property');
      if (nonempty(seo.twitterTitle)) setMeta('twitter:title', seo.twitterTitle);
      if (nonempty(seo.twitterDescription)) setMeta('twitter:description', seo.twitterDescription);
      var twImg = nonempty(seo.twitterImage) ? seo.twitterImage : ogImg;
      if (nonempty(twImg)) setMeta('twitter:image', twImg);
    }
  }

  function applyPageSeo(pages) {
    if (!pages || typeof pages !== 'object') return;
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    var p = pages[path] || pages['/' + path];
    if (!p) return;
    if (nonempty(p.title)) document.title = p.title;
    if (nonempty(p.description)) setMeta('description', p.description);
    if (nonempty(p.keywords)) setMeta('keywords', p.keywords);
    if (nonempty(p.canonical)) setLinkRel('canonical', p.canonical);
  }

  function rebuildNav(ulSelector, items, isMain) {
    if (!items || !items.length) return;
    var nav = document.getElementById('nav');
    if (!nav || !isMain) return;

    var mobileCta = nav.querySelector('.nav-mobile-cta');
    Array.prototype.slice.call(nav.children).forEach(function (child) {
      if (child.classList && child.classList.contains('nav-mobile-cta')) return;
      if (child.tagName === 'A') child.remove();
    });

    var frag = document.createDocumentFragment();
    items.forEach(function (item) {
      if (!item || !item.href) return;
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label || item.href;
      var cur = (location.pathname || '').split('/').pop() || 'index.html';
      if (cur === item.href || (cur === '' && item.href === 'index.html')) a.classList.add('active');
      frag.appendChild(a);
    });
    if (mobileCta) nav.insertBefore(frag, mobileCta);
    else nav.appendChild(frag);
  }

  function applyNav(nav) {
    if (!nav) return;
    if (nav.main && nav.main.length) rebuildNav('#nav', nav.main, true);

    if (nav.footer && nav.footer.length) {
      var blocks = document.querySelectorAll('.footer-links');
      if (blocks[0]) {
        var h4 = blocks[0].querySelector('h4');
        blocks[0].innerHTML = '';
        if (h4) blocks[0].appendChild(h4);
        else {
          var t = document.createElement('h4');
          t.textContent = 'Quick Links';
          blocks[0].appendChild(t);
        }
        nav.footer.forEach(function (item) {
          if (!item || !item.href) return;
          var a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.label || item.href;
          blocks[0].appendChild(a);
        });
      }
    }

    if (nav.services && nav.services.length) {
      var svcBlocks = document.querySelectorAll('.footer-links');
      if (svcBlocks[1]) {
        var h = svcBlocks[1].querySelector('h4');
        svcBlocks[1].innerHTML = '';
        if (h) svcBlocks[1].appendChild(h);
        else {
          var t2 = document.createElement('h4');
          t2.textContent = 'Services';
          svcBlocks[1].appendChild(t2);
        }
        nav.services.forEach(function (item) {
          if (!item || !item.href) return;
          var a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.label || item.href;
          svcBlocks[1].appendChild(a);
        });
      }
    }
  }

  function applyAll(data) {
    if (!data) return;
    try {
      applyBranding(data.branding, data.media);
      applyContact(data.contact);
      applyMedia(data.media);
      applySeo(data.seo, data.media);
      applyPageSeo(data.pages);
      applyNav(data.nav);
    } catch (e) {
      console.warn('[TEG config]', e);
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

  loadContent().then(applyAll);
  window.TEG_SITE = { loadContent: loadContent, applyAll: applyAll };
})();
