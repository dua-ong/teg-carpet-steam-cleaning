// Header scroll
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Quote form demo
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Quote Requested ✓';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2500);
    }, 900);
  });
}

// Scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.anim-on-scroll').forEach(el => scrollObserver.observe(el));

// Smooth in-page anchors only
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// Phone shake attention (every ~6s, like oncloudapi style)
function startPhoneShake() {
  const phones = document.querySelectorAll('.phone-link, .phone-shake');
  if (!phones.length) return;
  setInterval(() => {
    phones.forEach(el => {
      el.classList.add('is-shaking');
      setTimeout(() => el.classList.remove('is-shaking'), 900);
    });
  }, 6000);
}
startPhoneShake();
