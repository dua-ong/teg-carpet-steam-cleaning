/**
 * T.E.G live-site config + forceUI + CTA styles
 */
(function () {
  // Inject styles: SMS float + Call Now blue outline + header spacing
  if (!document.getElementById('teg-ui-css')) {
    var st = document.createElement('style');
    st.id = 'teg-ui-css';
    st.textContent = [
      /* SMS float */
      '.sms-float{position:fixed;bottom:28px;right:28px;z-index:999;width:60px;height:60px;background:#0ea5e9;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(14,165,233,.45);transition:transform .35s,box-shadow .3s}',
      '.sms-float svg{width:28px;height:28px}',
      '.sms-float:hover{transform:scale(1.14);box-shadow:0 10px 32px rgba(14,165,233,.55)}',
      '.whatsapp-float{background:#0ea5e9!important;box-shadow:0 6px 24px rgba(14,165,233,.45)!important}',
      /* Header: separate logo / nav / CTAs */
      '.header-inner{gap:36px!important}',
      '.header .nav{margin-left:auto!important;margin-right:12px!important;gap:26px!important}',
      '.header-actions{margin-left:20px!important;padding-left:24px!important;border-left:1px solid rgba(14,165,233,.2)!important;gap:14px!important}',
      'body:not(.page-inner) .header:not(.scrolled) .header-actions{border-left-color:rgba(255,255,255,.25)!important}',
      /* Nav Call Now: blue outline, no fill */
      '.header-actions .phone-link,a.phone-link.phone-shake{',
      '  display:inline-flex!important;align-items:center;justify-content:center;',
      '  padding:8px 16px!important;border-radius:10px!important;',
      '  border:2px solid #0ea5e9!important;background:transparent!important;',
      '  color:#0ea5e9!important;font-weight:600!important;text-decoration:none!important;',
      '}',
      '.header-actions .phone-link:hover,a.phone-link.phone-shake:hover{background:rgba(14,165,233,.08)!important}',
      'body:not(.page-inner) .header:not(.scrolled) .header-actions .phone-link{',
      '  border-color:rgba(255,255,255,.75)!important;color:#fff!important;',
      '}',
      'body:not(.page-inner) .header:not(.scrolled) .header-actions .phone-link:hover{',
      '  background:rgba(255,255,255,.12)!important;border-color:#fff!important;',
      '}',
      /* Call Now buttons (hero/CTAs): blue outline, never yellow */
      'a.btn.phone-shake,a.btn[href^="tel:"],.btn-call{',
      '  background:transparent!important;border:2px solid #0ea5e9!important;',
      '  color:#0ea5e9!important;box-shadow:none!important;',
      '}',
      'a.btn.phone-shake:hover,a.btn[href^="tel:"]:hover{',
      '  background:rgba(14,165,233,.1)!important;border-color:#0ea5e9!important;color:#0ea5e9!important;',
      '}',
      /* Dark sections: white outline Call Now */
      '.cta-banner a.btn.phone-shake,.cta-banner a.btn[href^="tel:"],',
      '.hero a.btn.phone-shake,.hero a.btn[href^="tel:"]{',
      '  border-color:rgba(255,255,255,.85)!important;color:#fff!important;background:transparent!important;',
      '}',
      '.cta-banner a.btn.phone-shake:hover,.hero a.btn.phone-shake:hover{',
      '  background:rgba(255,255,255,.12)!important;border-color:#fff!important;color:#fff!important;',
      '}',
      /* Page hero light bg: force blue outline even if btn-primary was left on */
      '.page-hero a.btn.phone-shake,.page-hero a.btn[href^="tel:"],',
      '.hero-ctas a.btn.phone-shake,.hero-ctas a.btn[href^="tel:"]{',
      '  background:transparent!important;border:2px solid #0ea5e9!important;color:#0ea5e9!important;',
      '}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  function nonempty(v) {
    return v != null && String(v).trim() !== '';
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

  function applyBranding(b) {
    if (!b) return;
    if (nonempty(b.logoMark)) setAllText('.logo-mark', b.logoMark);
    if (nonempty(b.logoText)) setAllText('.logo-text', b.logoText);
  }

  function applyContact(c) {
    if (!c) return;
    var tel = telHref(c.phone, c.phoneTel) || 'tel:+14147753705';
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

  function forceUI() {
    document.querySelectorAll('a[href^="tel:"], a.phone-link, a.phone-shake').forEach(function (a) {
      if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
      a.setAttribute('href', 'tel:+14147753705');
      var t = (a.textContent || '').trim();
      if (t.indexOf('414') !== -1 || t.indexOf('Call') === 0 || /^\+?[\d\s().-]{7,}$/.test(t) || t === 'Call Now') {
        a.textContent = 'Call Now';
      }
      // Drop yellow primary from Call Now buttons
      if (a.classList.contains('btn')) {
        a.classList.remove('btn-primary');
        a.classList.add('phone-shake');
      }
    });
    document.querySelectorAll('a.whatsapp-float, a[href*="wa.me"]').forEach(function (a) {
      a.setAttribute('href', 'sms:+14147753705');
      a.classList.add('sms-float');
      a.setAttribute('aria-label', 'Text us');
      a.removeAttribute('target');
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7V9zm0-3h10v2H7V6zm0 6h7v2H7v-2z"/></svg>';
    });
    document.querySelectorAll('a.btn, button.btn, h3').forEach(function (el) {
      var t = el.textContent || '';
      if (/Get a Free Quote/i.test(t)) el.textContent = t.replace(/Get a Free Quote/ig, 'Get a Free Estimate');
      else if (/Get a Quote/i.test(t)) el.textContent = t.replace(/Get a Quote/ig, 'Get an Estimate');
      else if (/Request a Quote/i.test(t)) el.textContent = t.replace(/Request a Quote/ig, 'Request an Estimate');
      else if (/Get My Quote/i.test(t)) el.textContent = t.replace(/Get My Quote/ig, 'Get My Estimate');
    });
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
    document.querySelectorAll('.logo-text').forEach(function (el) {
      if ((el.textContent || '').indexOf('Furniture') === -1) {
        el.textContent = 'Carpet & Furniture Steam Cleaning';
      }
    });
  }

  function applyAll(data) {
    try {
      if (data) {
        applyBranding(data.branding);
        applyContact(data.contact);
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
