// Header scroll
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
  if (document.body.classList.contains('page-inner')) {
    header.classList.add('scrolled');
  }
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

// Quote form → opens email client with details (works without backend)
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (form.querySelector('#name') || {}).value || '';
    const phone = (form.querySelector('#phone') || {}).value || '';
    const email = (form.querySelector('#email') || {}).value || '';
    const service = (form.querySelector('#service') || {}).value || '';
    const message = (form.querySelector('#message') || {}).value || '';
    const subject = encodeURIComponent('Quote Request — T.E.G Carpet Cleaning');
    const body = encodeURIComponent(
      'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email +
      '\nService: ' + service + '\n\nDetails:\n' + message
    );
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Opening email…';
    btn.disabled = true;
    window.location.href = 'mailto:contact@teg-carpetsteamcleaning.com?subject=' + subject + '&body=' + body;
    setTimeout(() => {
      btn.textContent = 'Request Sent — Check Email';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 3000);
    }, 600);
  });
}

// Scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.anim-on-scroll').forEach(el => scrollObserver.observe(el));

// Smooth in-page anchors
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

// Phone shake attention
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
