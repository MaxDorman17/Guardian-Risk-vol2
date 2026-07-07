/* Guardian Risk — interactions
   Restrained by design: fade-up reveal, header state, mobile nav, form handling. */
(function () {
  'use strict';

  /* ---- Header state on scroll ---- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
      var open = document.body.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.mobile-nav a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  /* ---- Fade-up reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay') || 0;
          setTimeout(function () { el.classList.add('in'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Auto-stagger groups (adds incremental delay to children) ---- */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var kids = group.querySelectorAll('.reveal');
    kids.forEach(function (k, i) { k.setAttribute('data-delay', i * 90); });
  });

  /* ---- Current year ---- */
  document.querySelectorAll('.js-year').forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });

  /* ---- Contact form (front-end only; no backend endpoint yet) ---- */
  var form = document.querySelector('.form');
  if (form) {
    var status = form.querySelector('.form-status');
    var lastSubmit = 0;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // honeypot
      var hp = form.querySelector('input[name="company_url"]');
      if (hp && hp.value) return;

      // required-field validation
      var required = form.querySelectorAll('[required]');
      var firstInvalid = null;
      required.forEach(function (f) {
        var ok = f.value.trim() !== '';
        if (f.type === 'email') ok = ok && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
        f.style.borderColor = ok ? '' : 'rgba(220,80,80,0.6)';
        if (!ok && !firstInvalid) firstInvalid = f;
      });
      if (firstInvalid) {
        showStatus('Please complete the required fields with a valid email address.', 'err');
        firstInvalid.focus();
        return;
      }

      // simple rate limit
      var now = Date.now();
      if (now - lastSubmit < 4000) {
        showStatus('Please wait a moment before sending.', 'err');
        return;
      }
      lastSubmit = now;

      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      // No endpoint configured yet — simulate success and guide to email.
      setTimeout(function () {
        showStatus('Thank you. Your request has been received. For urgent matters, email ir@guardianrisk.co.uk.', 'ok');
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = label; }
      }, 700);
    });

    function showStatus(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status show ' + kind;
    }
  }
})();
