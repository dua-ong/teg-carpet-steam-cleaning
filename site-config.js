/**
 * T.E.G — UI + LocalBusiness schema + GMB / Google Review CTAs
 */
(function () {
  var GMB = 'https://g.page/teg-carpet-steam-cleaning';
  var GMB_REVIEW = 'https://g.page/teg-carpet-steam-cleaning/review';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=TEG+Carpet+%26+Furniture+Steam+Cleaning+4111+N+Port+Washington+Rd+Milwaukee+WI';

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
      /* Google review / GMB strip */
      '.teg-gmb-bar{background:#0a2540;color:#fff;padding:28px 16px;text-align:center}',
      '.teg-gmb-bar p{margin:0 0 14px;font-size:16px;opacity:.95}',
      '.teg-gmb-bar .teg-gmb-actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}',
      '.teg-gmb-bar a{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none}',
      '.teg-gmb-bar a.teg-review{background:#f5a623;color:#1a1a1a}',
      '.teg-gmb-bar a.teg-maps{background:transparent;border:2px solid rgba(255,255,255,.7);color:#fff}',
      '.footer-contact a.teg-gmb-link{display:block;margin-top:8px;color:#7dd3fc!important}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  /* Schema: LocalBusiness + rating + GMB sameAs */
  if (!document.getElementById('teg-schema-ld')) {
    var schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
          '@id': 'https://tegcarpetsteamcleaning.com/#business',
          'name': 'T.E.G Carpet & Furniture Steam Cleaning',
          'alternateName': ['TEG Carpet Steam Cleaning', 'T.E.G Carpet Steam Cleaning'],
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
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '5.0',
            'reviewCount': '32',
            'bestRating': '5',
            'worstRating': '1'
          },
          'areaServed': [
            'Milwaukee, WI', 'Wauwatosa, WI', 'Brookfield, WI', 'New Berlin, WI',
            'West Allis, WI', 'Greenfield, WI', 'Franklin, WI', 'Muskego, WI',
            'Pewaukee, WI', 'Oak Creek, WI', 'Elm Grove, WI', 'Hales Corners, WI', 'Greendale, WI'
          ],
          'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Cleaning services',
            'itemListElement': [
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Carpet Cleaning', 'url': 'https://tegcarpetsteamcleaning.com/service-carpet-cleaning.html'}},
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Tile and Grout Cleaning', 'url': 'https://tegcarpetsteamcleaning.com/service-tile-grout.html'}},
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Upholstery Cleaning', 'url': 'https://tegcarpetsteamcleaning.com/service-couch-cleaning.html'}},
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Steam Cleaning', 'url': 'https://tegcarpetsteamcleaning.com/service-steam-cleaning.html'}},
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Pet Odor and Stain Removal', 'url': 'https://tegcarpetsteamcleaning.com/service-stain-removal.html'}},
              {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': 'Commercial Carpet Cleaning', 'url': 'https://tegcarpetsteamcleaning.com/service-commercial.html'}}
            ]
          },
          'sameAs': [
            'https://g.page/teg-carpet-steam-cleaning',
            'https://www.google.com/maps?cid=',
            'https://www.yelp.com',
            'https://www.instagram.com',
            'https://www.mapquest.com/us/wisconsin/teg-carpet-steam-cleaning-429957477'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://tegcarpetsteamcleaning.com/#website',
          'url': 'https://tegcarpetsteamcleaning.com/',
          'name': 'T.E.G Carpet & Furniture Steam Cleaning',
          'publisher': { '@id': 'https://tegcarpetsteamcleaning.com/#business' }
        }
      ]
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
    if (footer && !document.getElementById('teg-gmb-bar')) {
      var bar = document.createElement('div');
      bar.id = 'teg-gmb-bar';
      bar.className = 'teg-gmb-bar';
      bar.innerHTML =
        '<p>Happy with your clean? <strong>Leave a Google review</strong> — it helps other Milwaukee neighbors find us.</p>' +
        '<div class="teg-gmb-actions">' +
        '<a class="teg-review" href="' + GMB_REVIEW + '" target="_blank" rel="noopener">★ Write a Google Review</a>' +
        '<a class="teg-maps" href="' + GMB + '" target="_blank" rel="noopener">View on Google Maps</a>' +
        '</div>';
      footer.parentNode.insertBefore(bar, footer);
    }
    document.querySelectorAll('.footer-contact').forEach(function (el) {
      if (el.querySelector('.teg-gmb-link')) return;
      var a1 = document.createElement('a');
      a1.href = GMB;
      a1.className = 'teg-gmb-link';
      a1.target = '_blank';
      a1.rel = 'noopener';
      a1.textContent = 'Google Business Profile';
      el.appendChild(a1);
      var a2 = document.createElement('a');
      a2.href = GMB_REVIEW;
      a2.className = 'teg-gmb-link';
      a2.target = '_blank';
      a2.rel = 'noopener';
      a2.textContent = 'Leave a Google Review';
      el.appendChild(a2);
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
      if (a.classList.contains('btn')) {
        a.classList.remove('btn-primary');
        a.classList.add('phone-shake');
      }
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
    injectGmbUi();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', forceUI);
  else forceUI();
  setTimeout(forceUI, 400);
  setTimeout(forceUI, 1200);
  window.TEG_SITE = { forceUI: forceUI };
})();
