/**
 * T.E.G — UI + LocalBusiness schema + GMB / Google Review CTAs + CMS media
 * Edit this file only — do not replace with a parallel script.
 */
(function () {
  var GMB = 'https://g.page/teg-carpet-steam-cleaning';
  var GMB_REVIEW = 'https://g.page/teg-carpet-steam-cleaning/review';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=TEG+Carpet+%26+Furniture+Steam+Cleaning+4111+N+Port+Washington+Rd+Milwaukee+WI';

  var MAP_EMBED = 'https://maps.google.com/maps?q=4111%20N%20Port%20Washington%20Rd%20suite%201%2C%20Milwaukee%2C%20WI%2053217&z=15&ie=UTF8&output=embed';
  var MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=TEG+Carpet+%26+Furniture+Steam+Cleaning+4111+N+Port+Washington+Rd+Milwaukee+WI';

  function injectFooterMap() {
    var footer = document.querySelector('footer.footer .container');
    if (!footer || document.getElementById('teg-footer-map')) return;
    var box = document.createElement('div');
    box.id = 'teg-footer-map';
    box.className = 'teg-footer-map';
    box.innerHTML =
      '<div class="teg-footer-map-inner">' +
        '<div class="teg-footer-map-head">' +
          '<h4>Find us on the map</h4>' +
          '<a href="' + MAP_LINK + '" target="_blank" rel="noopener">Open in Google Maps</a>' +
        '</div>' +
        '<iframe title="T.E.G Carpet Steam Cleaning location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + MAP_EMBED + '" allowfullscreen></iframe>' +
        '<div class="teg-footer-map-addr">' +
          '<strong>T.E.G Carpet & Furniture Steam Cleaning</strong>' +
          '4111 N Port Washington Rd suite 1<br>Milwaukee, WI 53217, United States' +
        '</div>' +
      '</div>';
    var bottom = footer.querySelector('.footer-bottom');
    if (bottom) footer.insertBefore(box, bottom);
    else footer.appendChild(box);
  }

  function injectContactMapBox() {
    if (!/contact\.html/i.test(location.pathname) && location.pathname.replace(/\/$/, '').slice(-7) !== 'contact') return;
    if (document.getElementById('teg-contact-map-box')) return;
    var section = document.querySelector('section.contact .container') || document.querySelector('main .container');
    if (!section) return;
    var box = document.createElement('div');
    box.id = 'teg-contact-map-box';
    box.className = 'teg-contact-map-box anim-on-scroll';
    box.innerHTML =
      '<div class="teg-map-top">' +
        '<div class="teg-map-info">' +
          '<h2>Our location</h2>' +
          '<p>Visit or pin us for service across Milwaukee and western suburbs.</p>' +
          '<div class="teg-addr-line"><span class="icon" aria-hidden="true">📍</span><div><strong>Address</strong><br>4111 N Port Washington Rd suite 1<br>Milwaukee, WI 53217<br>United States</div></div>' +
          '<div class="teg-addr-line"><span class="icon" aria-hidden="true">📞</span><div><strong>Phone</strong><br><a href="tel:+14147753705">Call Now · +1 (414) 775-3705</a></div></div>' +
          '<div class="teg-addr-line"><span class="icon" aria-hidden="true">✉️</span><div><strong>Email</strong><br><a href="mailto:contact@teg-carpetsteamcleaning.com">contact@teg-carpetsteamcleaning.com</a></div></div>' +
          '<div class="teg-addr-line"><span class="icon" aria-hidden="true">🕒</span><div><strong>Hours</strong><br>24/7 — Always Available</div></div>' +
          '<div class="teg-map-actions">' +
            '<a class="primary" href="' + MAP_LINK + '" target="_blank" rel="noopener">Get directions</a>' +
            '<a class="ghost" href="' + GMB + '" target="_blank" rel="noopener">Google Business Profile</a>' +
          '</div>' +
        '</div>' +
        '<div class="teg-map-frame">' +
          '<iframe title="T.E.G location map Milwaukee" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + MAP_EMBED + '" allowfullscreen></iframe>' +
        '</div>' +
      '</div>';
    section.appendChild(box);
  }

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
      '.teg-gmb-bar{position:relative;background:#071a2e;color:#fff;padding:36px 20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,.06)}',
      '.teg-gmb-bar::before{content:"";display:block;height:3px;width:100%;position:absolute;top:0;left:0;background:linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853,#4285F4);background-size:200% 100%;animation:tegGoogleLine 8s linear infinite}',
      '@keyframes tegGoogleLine{0%{background-position:0% 50%}100%{background-position:200% 50%}}',
      '.teg-gmb-bar p{margin:0 0 20px;font-size:16px;line-height:1.5;opacity:.95;max-width:520px;margin-left:auto;margin-right:auto}',
      '.teg-gmb-bar .teg-gmb-actions{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center}',
      '.teg-gmb-bar a{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:13px 22px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;min-width:200px;box-sizing:border-box;transition:box-shadow .25s}',
      '.teg-gmb-bar a.teg-review{background:transparent!important;border:2px solid #4285F4;color:#4285F4;animation:tegReviewCycle 5.5s ease-in-out infinite;box-shadow:0 0 0 0 rgba(66,133,244,.35)}',
      '@keyframes tegReviewCycle{0%,100%{border-color:#4285F4;color:#4285F4;box-shadow:0 0 12px rgba(66,133,244,.35)}25%{border-color:#EA4335;color:#EA4335;box-shadow:0 0 12px rgba(234,67,53,.35)}50%{border-color:#FBBC05;color:#FBBC05;box-shadow:0 0 12px rgba(251,188,5,.35)}75%{border-color:#34A853;color:#34A853;box-shadow:0 0 12px rgba(52,168,83,.35)}}',
      '.teg-gmb-bar a.teg-maps{background:linear-gradient(120deg,#EA4335,#FBBC05,#34A853,#4285F4,#EA4335);background-size:300% 300%;animation:tegMapsGrad 6s ease infinite;color:#fff!important;border:none;text-shadow:0 1px 2px rgba(0,0,0,.35)}',
      '@keyframes tegMapsGrad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}',
      '.footer-contact a.teg-gmb-link{display:block;margin-top:8px;color:#7dd3fc!important}',
      '@media (max-width:768px){.teg-gmb-bar{padding:28px 16px 32px}.teg-gmb-bar .teg-gmb-actions{flex-direction:column;width:100%;max-width:320px;margin:0 auto}.teg-gmb-bar a{width:100%;min-width:0}}',
      '.hero-video-wrap.has-hero-image{background-size:cover;background-position:center;background-repeat:no-repeat}',
      '.hero-video-wrap.has-hero-image .hero-video{display:none!important}',
      '.ba-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-top:28px}',
      '.ba-pair{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden}',
      '.ba-pair .ba-imgs{display:grid;grid-template-columns:1fr 1fr;gap:0}',
      '.ba-pair img{width:100%;height:160px;object-fit:cover;display:block}',
      '.ba-pair .ba-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;padding:6px 10px;background:#0a3d6b;color:#fff}',
      '.teg-footer-map{margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,.1)}',
      '.teg-footer-map-inner{background:linear-gradient(145deg,rgba(14,165,233,.12),rgba(7,26,46,.9));border:1px solid rgba(125,211,252,.25);border-radius:16px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.25)}',
      '.teg-footer-map-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;background:rgba(10,61,107,.55)}',
      '.teg-footer-map-head h4{margin:0;color:#fff;font-size:15px;font-weight:700;letter-spacing:.02em}',
      '.teg-footer-map-head a{color:#7dd3fc;font-size:13px;font-weight:600;text-decoration:none}',
      '.teg-footer-map-head a:hover{color:#fff;text-decoration:underline}',
      '.teg-footer-map iframe{display:block;width:100%;height:220px;border:0;filter:grayscale(.15) contrast(1.05)}',
      '.teg-footer-map-addr{padding:12px 18px 16px;color:rgba(255,255,255,.88);font-size:13px;line-height:1.55}',
      '.teg-footer-map-addr strong{display:block;color:#fff;font-size:14px;margin-bottom:4px}',
      '@media (max-width:768px){.teg-footer-map iframe{height:200px}}',
      '.teg-contact-map-box{margin-top:36px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(10,61,107,.08)}',
      '.teg-contact-map-box .teg-map-top{display:grid;grid-template-columns:1fr 1.2fr;gap:0}',
      '@media (max-width:900px){.teg-contact-map-box .teg-map-top{grid-template-columns:1fr}}',
      '.teg-contact-map-box .teg-map-info{padding:28px 26px;background:linear-gradient(160deg,#0a3d6b 0%,#0c4a7a 100%);color:#fff}',
      '.teg-contact-map-box .teg-map-info h2{margin:0 0 8px;font-size:22px;color:#fff}',
      '.teg-contact-map-box .teg-map-info p{margin:0 0 18px;opacity:.9;font-size:14px;line-height:1.5}',
      '.teg-contact-map-box .teg-addr-line{display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;font-size:14px;line-height:1.5}',
      '.teg-contact-map-box .teg-addr-line span.icon{flex-shrink:0;width:36px;height:36px;border-radius:10px;background:rgba(14,165,233,.25);display:flex;align-items:center;justify-content:center;font-size:16px}',
      '.teg-contact-map-box .teg-addr-line a{color:#7dd3fc;font-weight:600;text-decoration:none}',
      '.teg-contact-map-box .teg-addr-line a:hover{text-decoration:underline}',
      '.teg-contact-map-box iframe{display:block;width:100%;height:100%;min-height:280px;border:0}',
      '.teg-contact-map-box .teg-map-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}',
      '.teg-contact-map-box .teg-map-actions a{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none}',
      '.teg-contact-map-box .teg-map-actions a.primary{background:#0ea5e9;color:#fff}',
      '.teg-contact-map-box .teg-map-actions a.ghost{background:transparent;border:2px solid rgba(255,255,255,.35);color:#fff}',
      '.ba-pair .ba-caption{padding:10px 12px;font-size:13px;color:#475569;margin:0}'
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
        'alternateName': ['TEG Carpet Steam Cleaning', 'T.E.G Carpet Steam Cleaning'],
        'description': 'Professional carpet cleaning, steam cleaning, tile & grout, upholstery, pet odor & stain removal, and commercial carpet cleaning in Milwaukee, WI and western suburbs. Upfront pricing, kid & pet safe, licensed & insured, available 24/7.',
        'url': 'https://tegcarpetsteamcleaning.com/',
        'telephone': '+1-414-775-3705',
        'email': 'contact@teg-carpetsteamcleaning.com',
        'image': 'https://tegcarpetsteamcleaning.com/favicon.svg',
        'priceRange': '$$',
        'address': {'@type': 'PostalAddress','streetAddress': '4111 N Port Washington Rd suite 1','addressLocality': 'Milwaukee','addressRegion': 'WI','postalCode': '53217','addressCountry': 'US'},
        'geo': {'@type': 'GeoCoordinates', 'latitude': 43.0895, 'longitude': -87.8910},
        'openingHoursSpecification': {'@type': 'OpeningHoursSpecification','dayOfWeek': ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],'opens': '00:00','closes': '23:59'},
        'aggregateRating': {'@type': 'AggregateRating','ratingValue': '5.0','reviewCount': '32','bestRating': '5','worstRating': '1'},
        'knowsAbout': ['carpet cleaning','steam cleaning','tile and grout cleaning','upholstery cleaning','pet odor removal','stain removal','commercial carpet cleaning','hot water extraction'],
        'areaServed': [{'@type':'City','name':'Milwaukee'},{'@type':'City','name':'Wauwatosa'},{'@type':'City','name':'Brookfield'},{'@type':'City','name':'New Berlin'},{'@type':'City','name':'West Allis'},{'@type':'City','name':'Greenfield'},{'@type':'City','name':'Franklin'},{'@type':'City','name':'Muskego'},{'@type':'City','name':'Pewaukee'},{'@type':'City','name':'Oak Creek'},{'@type':'City','name':'Elm Grove'},{'@type':'City','name':'Hales Corners'},{'@type':'City','name':'Greendale'}],
        'hasOfferCatalog': {'@type': 'OfferCatalog','name': 'Cleaning services','itemListElement': [
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Carpet Cleaning','url':'https://tegcarpetsteamcleaning.com/service-carpet-cleaning.html'}},
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Tile and Grout Cleaning','url':'https://tegcarpetsteamcleaning.com/service-tile-grout.html'}},
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Upholstery Cleaning','url':'https://tegcarpetsteamcleaning.com/service-couch-cleaning.html'}},
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Steam Cleaning','url':'https://tegcarpetsteamcleaning.com/service-steam-cleaning.html'}},
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Pet Odor and Stain Removal','url':'https://tegcarpetsteamcleaning.com/service-stain-removal.html'}},
          {'@type':'Offer','itemOffered':{'@type':'Service','name':'Commercial Carpet Cleaning','url':'https://tegcarpetsteamcleaning.com/service-commercial.html'}}
        ]},
        'sameAs': ['https://g.page/teg-carpet-steam-cleaning','https://www.google.com/maps/search/?api=1&query=TEG+Carpet+%26+Furniture+Steam+Cleaning+4111+N+Port+Washington+Rd+Milwaukee+WI','https://www.yelp.com/biz/teg-carpet-steam-cleaning-milwaukee-3','https://www.mapquest.com/us/wisconsin/teg-carpet-steam-cleaning-429957477']
      },{
        '@type': 'WebSite',
        '@id': 'https://tegcarpetsteamcleaning.com/#website',
        'url': 'https://tegcarpetsteamcleaning.com/',
        'name': 'T.E.G Carpet & Furniture Steam Cleaning',
        'publisher': {'@id': 'https://tegcarpetsteamcleaning.com/#business'}
      }]
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'teg-schema-ld';
    s.textContent = JSON.stringify(schema);
    (document.head || document.documentElement).appendChild(s);
  }

  function injectGmbUi() {
    if (document.getElementById('teg-gmb-bar')) return;
    var footer = document.querySelector('footer.footer');
    if (footer) {
      var bar = document.createElement('div');
      bar.id = 'teg-gmb-bar';
      bar.className = 'teg-gmb-bar';
      bar.innerHTML = '<p>Happy with your clean? <strong>Leave a Google review</strong> — it helps other Milwaukee neighbors find us.</p><div class="teg-gmb-actions"><a class="teg-review" href="' + GMB_REVIEW + '" target="_blank" rel="noopener">★ Write a Google Review</a><a class="teg-maps" href="' + GMB + '" target="_blank" rel="noopener">View on Google Maps</a></div>';
      footer.parentNode.insertBefore(bar, footer);
    }
    document.querySelectorAll('.footer-contact').forEach(function (el) {
      if (el.querySelector('.teg-gmb-link')) return;
      var a1 = document.createElement('a'); a1.href = GMB; a1.className = 'teg-gmb-link'; a1.target = '_blank'; a1.rel = 'noopener'; a1.textContent = 'Google Business Profile'; el.appendChild(a1);
      var a2 = document.createElement('a'); a2.href = GMB_REVIEW; a2.className = 'teg-gmb-link'; a2.target = '_blank'; a2.rel = 'noopener'; a2.textContent = 'Leave a Google Review'; el.appendChild(a2);
    });
  }

  function applyCmsMedia(content) {
    if (!content || !content.media) return;
    var m = content.media;
    var wrap = document.querySelector('.hero-video-wrap');
    var vid = document.getElementById('heroVideo') || document.querySelector('video.hero-video');
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === '' || page === '/') page = 'index.html';
    var heroImg = m.heroImage || '';
    if (content.pageMedia && content.pageMedia[page] && content.pageMedia[page].heroImage) heroImg = content.pageMedia[page].heroImage;
    if (content.services && Array.isArray(content.services)) {
      content.services.forEach(function (svc) {
        if (svc.href && page === svc.href.toLowerCase() && svc.heroImage) heroImg = svc.heroImage;
      });
    }
    if (heroImg && wrap) {
      wrap.classList.add('has-hero-image');
      wrap.style.backgroundImage = 'url(' + heroImg + ')';
      if (vid) { vid.removeAttribute('src'); vid.querySelectorAll('source').forEach(function (s) { s.remove(); }); if (vid.load) vid.load(); }
    } else if (vid && m.heroVideo) {
      var src = vid.querySelector('source');
      if (src) src.setAttribute('src', m.heroVideo);
      else { var ns = document.createElement('source'); ns.src = m.heroVideo; ns.type = 'video/mp4'; vid.appendChild(ns); }
      if (m.heroPoster) vid.setAttribute('poster', m.heroPoster);
      if (vid.load) vid.load();
    } else if (vid && !m.heroVideo && !heroImg) {
      vid.querySelectorAll('source').forEach(function (s) { s.remove(); });
      vid.removeAttribute('src');
      try { vid.load(); } catch (e) {}
    }
    if (content.services && Array.isArray(content.services)) {
      content.services.forEach(function (svc) {
        if (!svc.href || page !== svc.href.toLowerCase()) return;
        if (!svc.beforeAfter || !svc.beforeAfter.length) return;
        var host = document.querySelector('.before-after-grid') || document.querySelector('#before-after') || document.querySelector('.svc-content');
        if (!host) return;
        var existing = document.getElementById('teg-ba-gallery');
        if (existing) existing.remove();
        var gal = document.createElement('div');
        gal.id = 'teg-ba-gallery';
        gal.className = 'ba-gallery';
        svc.beforeAfter.forEach(function (pair) {
          if (!pair.before && !pair.after) return;
          var card = document.createElement('div');
          card.className = 'ba-pair';
          var imgs = '<div class="ba-imgs">';
          if (pair.before) imgs += '<div><div class="ba-label">Before</div><img src="' + pair.before + '" alt="Before" loading="lazy" /></div>';
          if (pair.after) imgs += '<div><div class="ba-label">After</div><img src="' + pair.after + '" alt="After" loading="lazy" /></div>';
          imgs += '</div>';
          card.innerHTML = imgs + (pair.caption ? '<p class="ba-caption">' + pair.caption + '</p>' : '');
          gal.appendChild(card);
        });
        if (host.classList.contains('before-after-grid')) { host.parentNode.insertBefore(gal, host); host.style.display = 'none'; }
        else host.appendChild(gal);
      });
    }
  }

  function loadCmsAndApply() {
    var base = (window.location.port === '3000' || window.TEG_API) ? (window.TEG_API || '') : '';
    fetch(base + '/api/content').then(function (r) { return r.json(); }).then(function (data) { applyCmsMedia(data); }).catch(function () {});
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
    document.querySelectorAll('.contact-item').forEach(function (el) {
      if (/Hours/i.test(el.innerHTML || '')) { var sp = el.querySelector('span'); if (sp) sp.innerHTML = '24/7 — Always Available'; }
    });
    document.querySelectorAll('.logo-text').forEach(function (el) {
      if ((el.textContent || '').indexOf('Furniture') === -1) el.textContent = 'Carpet & Furniture Steam Cleaning';
    });
    injectGmbUi();
    injectFooterMap();
    injectContactMapBox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { forceUI(); loadCmsAndApply(); });
  } else { forceUI(); loadCmsAndApply(); }
  setTimeout(forceUI, 400);
  setTimeout(forceUI, 1200);
  window.TEG_SITE = { forceUI: forceUI, applyCmsMedia: applyCmsMedia };
})();
