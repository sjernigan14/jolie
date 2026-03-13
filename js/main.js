/**
 * Jolie French Bistro — main.js
 * Handles fade-in animations, mobile nav, smooth scroll, menu tabs
 */

document.addEventListener('DOMContentLoaded', function () {
  initFadeIn();
  initMobileNav();
  initSmoothScroll();
  updateCopyrightYear();
  setActiveNavLink();
  initMenuTabs();
});

/* ===== Fade-in on Scroll ===== */
function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));
}

/* ===== Mobile Navigation ===== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) closeMobileMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });
}

function closeMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;
  toggle.classList.remove('active');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== Smooth Scroll for Anchor Links ===== */
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('nav')?.offsetHeight || 0;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    closeMobileMenu();
  });
}

/* ===== Copyright Year ===== */
function updateCopyrightYear() {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ===== Active Nav Link ===== */
function setActiveNavLink() {
  const page = window.location.pathname.split('/').pop().replace(/\.html?$/, '') || 'index';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.replace(/\.html?$/, '').replace(/^\.\//, '') || 'index';
    if (linkPage === page) link.classList.add('active');
  });
}

/* ===== Menu Tab Switching ===== */
function initMenuTabs() {
  const tabs = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('[data-tab-content]');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.querySelector(`[data-tab-content="${name}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // Default: activate first tab
  if (tabs[0]) {
    tabs[0].classList.add('active');
    const first = document.querySelector(`[data-tab-content="${tabs[0].getAttribute('data-tab')}"]`);
    if (first) first.classList.add('active');
  }
}
