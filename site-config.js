/**
 * T.E.G — UI + LocalBusiness schema (SEO) — AEO/GMB CTAs gated
 * AEO_ENABLED = false until client pays for GMB/AEO package
 */
(function () {
  var AEO_ENABLED = false;

  var GMB = 'https://g.page/teg-carpet-steam-cleaning';
  var GMB_REVIEW = 'https://g.page/teg-carpet-steam-cleaning/review';
  var MAP_EMBED = 'https://www.google.com/maps?q=TEG+Carpet+%26+Furniture+Steam+Cleaning,+4111+N+Port+Washington+Rd+suite+1,+Milwaukee,+WI+53217&hl=en&z=16&output=embed';
  var MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=TEG+Carpet+%26+Furniture+Steam+Cleaning+4111+N+Port+Washington+Rd+Milwaukee+WI';

  if (!document.getElementById('teg-ui-css')) {
    var st = document.createElement('style');
    st.id = 'teg-ui-css';
    st.textContent = [
      '.whatsapp-float{display:none!important}',
      '.sms-float{position:fixed;bottom:28px;right:28px;z-index:999;width:60px;height:60px;background:#0ea5e9;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(14,165,233,.45)}',
      '.sms-float svg{width:28px;height:28px}',
      '.footer .logo-mark,.footer-brand .logo-mark{color:#38bdf8!important}',
      '.footer .logo-text,.footer-brand .logo-text{color:#ffffff!important}',
      '.footer-brand p,.footer-links a,.footer-contact a,.footer-contact p{color:rgba(255,255,255,.85)!important}',
      '.footer-links h4,.footer-contact h4{color:#fff!important}',
      '.footer-bottom p,.footer-bottom .support{color:rgba(255,255,255,.55)!important}',
      '.page-inner .header .logo-text{color:#0a3d6b!important}',
      '.page-inner .header .logo-mark{color:#0ea5e9!important}',
      '@media (min-width:769px){',
      '.header .container{padding-left:28px!important;padding-right:28px!important;max-width:100%!important}',
      '.header-inner{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;width:100%!important}',
      '.header .nav{display:flex!important;flex:1 1 auto!important;justify-content:center!important;gap:20px!important}',
      '.header .nav > a{white-space:nowrap!important;font-size:14px!important}',
      '.header-actions{display:flex!important;align-items:center!important;gap:12px!important;border:none!important}',
      '}',
      '.header-actions .phone-link{display:inline-flex!important;padding:7px 14px!important;border-radius:10px!important;border:2px solid #0ea5e9!important;background:transparent!important;color:#0ea5e9!important;font-weight:600!important;white-space:nowrap!important}',
      'body:not(.page-inner) .header:not(.scrolled) .header-actions .phone-link{border-color:rgba(255,255,255,.75)!important;color:#fff!important}',
      'a.btn.phone-shake,a.btn[href^="tel:"]{background:transparent!important;border:2px solid #0ea5e9!important;color:#0ea5e9!important;box-shadow:none!important}',
      '.cta-banner a.btn.phone-shake,.hero a.btn.phone-shake{border-color:rgba(255,255,255,.85)!important;color:#fff!important;background:transparent!important}',
      '.page-hero a.btn.phone-shake,.hero-ctas a.btn.phone-shake{background:transparent!important;border:2px solid #0ea5e9!important;color:#0ea5e9!important}',
      '.teg-footer-map{margin:0 0 28px;padding:0 0 24px;border-bottom:1px solid rgba(255,255,255,.1)}',
      '.teg-footer-map-inner{background:linear-gradient(145deg,rgba(14,165,233,.12),rgba(7,26,46,.9));border:1px solid rgba(125,211,252,.25);border-radius:16px;overflow:hidden}',
      '.teg-footer-map-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;background:rgba(10,61,107,.55)}',
      '.teg-footer-map-head h4{margin:0;color:#fff;font-size:15px;font-weight:700}',
      '.teg-footer-map-head a{color:#7dd3fc;font-size:13px;font-weight:600;text-decoration:none}',
      '.teg-footer-map iframe{display:block;width:100%;height:220px;border:0}',
      '.teg-footer-map-addr{padding:12px 18px 16px;color:rgba(255,255,255,.88);font-size:13px;line-height:1.55}',
      '.teg-footer-map-addr strong{display:block;color:#fff;font-size:14px;margin-bottom:4px}',
      '.page-inner .anim-on-scroll{opacity:1!important;transform:none!important}',
      '.teg-contact-map-box{margin-top:28px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden}',
      '.teg-contact-map-box .teg-map-top{display:grid;grid-template-columns:1fr 1.2fr}',
      '.teg-contact-map-box .teg-map-info{padding:28px 26px;background:linear-gradient(160deg,#0a3d6b,#0c4a7a);color:#fff}',
      '.teg-contact-map-box .teg-map-info h2{margin:0 0 8px;font-size:22px;color:#fff}',
      '.teg-contact-map-box .teg-addr-line{margin-bottom:12px;font-size:14px;line-height:1.5}',
      '.teg-contact-map-box .teg-addr-line a{color:#7dd3fc;font-weight:600}',
      '.teg-contact-map-box iframe{display:block;width:100%;min-height:280px;border:0}',
      '.teg-contact-map-box .teg-map-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}',
      '.teg-contact-map-box .teg-map-actions a.primary{background:#0ea5e9;color:#fff;padding:10px 16px;border-radius:10px;font-weight:700;text-decoration:none}',
      '.teg-contact-map-box .teg-map-actions a.ghost{border:2px solid rgba(255,255,255,.35);color:#fff;padding:10px 16px;border-radius:10px;font-weight:700;text-decoration:none}',
      '@media (max-width:900px){.teg-contact-map-box .teg-map-top{grid-template-columns:1fr}}',
      '.hero-video-wrap.has-hero-image{background-size:cover;background-position:center}',
      '.hero-video-wrap.has-hero-image .hero-video{display:none!important}',
      '.ba-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:28px}',
      '.ba-pair{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}',
      '.ba-pair .ba-imgs{display:grid;grid-template-columns:1fr 1fr}',
      '.ba-pair img{width:100%;height:160px;object-fit:cover;display:block}',
      '.ba-pair .ba-label{font-size:11px;font-weight:700;text-transform:uppercase;padding:6px 10px;background:#0a3d6b;color:#fff}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  if (!document.getElementById('teg-schema-ld')) {
    var schema = {
      '@context': 'https://schema.org',
      '@graph': [{
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': 'https://tegcarpetsteamcleaning.com/#business',
        'name': 'T.E.G Carpet & Furniture Steam Cleaning',
        'url': 'https://tegcarpetsteamcleaning.com/',
        'telephone': '+1-414-775-3705',
        'email': 'contact@teg-carpetsteamcleaning.com',
        'image': 'https://tegcarpetsteamcleaning.com/favicon.svg',
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '4111 N Port Washington Rd suite 1',
          'addressLocality': 'Milwaukee',
          'addressRegion': 'WI',
          'postalCode': '53217',
          'addressCountry': 'US'
        },
        'geo': { '@type': 'GeoCoordinates', 'latitude': 43.0895, 'longitude': -87.8910 },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
          'opens': '00:00',
          'closes': '23:59'
        },
        'areaServed': ['Milwaukee, WI', 'Wauwatosa, WI', 'Brookfield, WI', 'New Berlin, WI', 'West Allis, WI', 'Greenfield, WI', 'Franklin, WI', 'Muskego, WI', 'Pewaukee, WI', 'Oak Creek, WI', 'Elm Grove, WI', 'Hales Corners, WI', 'Greendale, WI']
      }, {
        '@type': 'WebSite',
        '@id': 'https://tegcarpetsteamcleaning.com/#website',
        'url': 'https://tegcarpetsteamcleaning.com/',
        'name': 'T.E.G Carpet & Furniture Steam Cleaning',
        'publisher': { '@id': 'https://tegcarpetsteamcleaning.com/#business' }
      }]
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'teg-schema-ld';
    s.textContent = JSON.stringify(schema);
    (document.head || document.documentElement).appendChild(s);
  }

  function injectFooterMap() {
    var footer = document.querySelector('footer.footer .container');
    if (!footer || document.getElementById('teg-footer-map')) return;
    var box = document.createElement('div');
    box.id = 'teg-footer-map';
    box.className = 'teg-footer-map';
    box.innerHTML = '<div class="teg-footer-map-inner"><div class="teg-footer-map-head"><h4>Find us on the map</h4><a href="' + MAP_LINK + '" target="_blank" rel="noopener">Open in Google Maps</a></div><iframe title="T.E.G location map" width="600" height="220" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + MAP_EMBED + '" allowfullscreen></iframe><div class="teg-footer-map-addr"><strong>T.E.G Carpet & Furniture Steam Cleaning</strong>4111 N Port Washington Rd suite 1<br>Milwaukee, WI 53217</div></div>';
    var grid = footer.querySelector('.footer-grid');
    if (grid) footer.insertBefore(box, grid);
    else footer.appendChild(box);
  }

  function injectContactMapBox() {
    if (!/contact/i.test(location.pathname)) return;
    if (document.getElementById('teg-contact-map-box')) return;
    var section = document.querySelector('section.contact .container') || document.querySelector('main .container');
    if (!section) return;
    var box = document.createElement('div');
    box.id = 'teg-contact-map-box';
    box.className = 'teg-contact-map-box';
    var gbp = AEO_ENABLED
      ? '<a class="ghost" href="' + GMB + '" target="_blank" rel="noopener">Google Business Profile</a>'
      : '';
    box.innerHTML = '<div class="teg-map-top"><div class="teg-map-info"><h2>Our location</h2><p>Milwaukee and western suburbs.</p><div class="teg-addr-line"><strong>Address</strong><br>4111 N Port Washington Rd suite 1<br>Milwaukee, WI 53217</div><div class="teg-addr-line"><strong>Phone</strong><br><a href="tel:+14147753705">Call Now</a></div><div class="teg-addr-line"><strong>Hours</strong><br>24/7 — Always Available</div><div class="teg-map-actions"><a class="primary" href="' + MAP_LINK + '" target="_blank" rel="noopener">Get directions</a>' + gbp + '</div></div><div class="teg-map-frame"><iframe title="Map" width="600" height="320" style="border:0" loading="lazy" src="' + MAP_EMBED + '" allowfullscreen></iframe></div></div>';
    section.appendChild(box);
  }

  function injectGmbUi() {
    if (!AEO_ENABLED) return;
    if (document.getElementById('teg-gmb-bar')) return;
    var footer = document.querySelector('footer.footer');
    if (!footer) return;
    var bar = document.createElement('div');
    bar.id = 'teg-gmb-bar';
    bar.className = 'teg-gmb-bar';
    bar.innerHTML = '<p>Happy with your clean? <strong>Leave a Google review</strong>.</p><div class="teg-gmb-actions"><a class="teg-review" href="' + GMB_REVIEW + '" target="_blank" rel="noopener">Write a Google Review</a><a class="teg-maps" href="' + GMB + '" target="_blank" rel="noopener">View on Google Maps</a></div>';
    footer.parentNode.insertBefore(bar, footer);
  }

  function forceUI() {
    document.querySelectorAll('a[href^="tel:"], a.phone-link, a.phone-shake').forEach(function (a) {
      if (a.closest && (a.closest('.sms-float') || a.closest('.whatsapp-float'))) return;
      a.setAttribute('href', 'tel:+14147753705');
      var t = (a.textContent || '').trim();
      if (t.indexOf('414') !== -1 || t.indexOf('Call') === 0 || /^\+?[\d\s().-]{7,}$/.test(t) || t === 'Call Now') a.textContent = 'Call Now';
      if (a.classList.contains('btn')) { a.classList.remove('btn-primary'); a.classList.add('phone-shake'); }
    });
    document.querySelectorAll('a.whatsapp-float').forEach(function (a) { a.remove(); });
    document.querySelectorAll('a.btn, button.btn, h3').forEach(function (el) {
      var t = el.textContent || '';
      if (/Get a Free Quote/i.test(t)) el.textContent = t.replace(/Get a Free Quote/ig, 'Get a Free Estimate');
      else if (/Get a Quote/i.test(t)) el.textContent = t.replace(/Get a Quote/ig, 'Get an Estimate');
      else if (/Request a Quote/i.test(t)) el.textContent = t.replace(/Request a Quote/ig, 'Request an Estimate');
      else if (/Get My Quote/i.test(t)) el.textContent = t.replace(/Get My Quote/ig, 'Get My Estimate');
    });
    document.querySelectorAll('.stat').forEach(function (el) {
      var s = el.querySelector('strong');
      if (s && /Mon/i.test(s.textContent || '')) { s.textContent = '24/7'; var sp = el.querySelector('span'); if (sp) sp.textContent = 'Always open'; }
    });
    document.querySelectorAll('.logo-text').forEach(function (el) {
      if ((el.textContent || '').indexOf('Furniture') === -1) el.textContent = 'Carpet & Furniture Steam Cleaning';
    });
    injectGmbUi();
    injectFooterMap();
    injectContactMapBox();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', forceUI);
  else forceUI();
  setTimeout(forceUI, 400);
  setTimeout(forceUI, 1200);
  window.TEG_SITE = { forceUI: forceUI, AEO_ENABLED: AEO_ENABLED };
})();
