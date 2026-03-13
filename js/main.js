/**
 * Jolie Restaurant - Main JavaScript
 * Handles all interactive behavior for the French bistro website
 */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all features
  initMobileNav();
  initScrollEffects();
  initSmoothScroll();
  updateCopyrightYear();
  setActiveNavLink();
  initMenuTabs();
});

/**
 * FEATURE 1: Mobile Navigation Toggle
 * Hamburger menu with smooth animation, outside click detection, and body scroll lock
 */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav a');

  if (!hamburger || !navMenu) return;

  // Toggle menu open/close
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');

  if (hamburger.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * FEATURE 2: Scroll Effects
 * Nav background solid on scroll, fade-in animation for elements, active link highlighting
 */
function initScrollEffects() {
  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');
  let heroHeight = hero ? hero.offsetHeight : 500;

  // Handle nav background on scroll
  window.addEventListener('scroll', function () {
    if (window.scrollY > heroHeight) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Update active nav link on scroll
    updateActiveNavLink();
  });

  // Initialize fade-in animations with Intersection Observer
  initFadeInObserver();
}

function initFadeInObserver() {
  const fadeElements = document.querySelectorAll('.fade-in-up');

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Set initial active nav link based on current page
 */
function setActiveNavLink() {
  updateActiveNavLink();
}

/**
 * Update active nav link based on current page
 */
function updateActiveNavLink() {
  const currentPage = getCurrentPageName();
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href && isLinkForCurrentPage(href, currentPage)) {
      link.classList.add('active');
    }
  });
}

/**
 * Get the current page filename without extension
 */
function getCurrentPageName() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop();
  return filename.replace(/\.html?$/, '') || 'index';
}

/**
 * Check if a link href matches the current page
 */
function isLinkForCurrentPage(href, currentPage) {
  const linkPage = href.replace(/\.html?$/, '').replace(/^\.\//, '') || 'index';
  return linkPage === currentPage || (currentPage === 'index' && (href === '.' || href === './' || href === './index.html'));
}

/**
 * FEATURE 3: Smooth Scroll
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const navHeight = document.querySelector('nav')?.offsetHeight || 0;

    window.scrollTo({
      top: targetPosition - navHeight,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    closeMobileMenu();
  });
}

/**
 * FEATURE 4: Current Year in Footer
 * Auto-update copyright year
 */
function updateCopyrightYear() {
  const yearElements = document.querySelectorAll('.year, [data-year]');
  const currentYear = new Date().getFullYear();

  yearElements.forEach(element => {
    if (element.classList.contains('year')) {
      element.textContent = currentYear;
    } else if (element.hasAttribute('data-year')) {
      element.textContent = currentYear;
    }
  });
}

/**
 * FEATURE 5: Menu Tab Switching
 * Toggle between Dinner and Beverages tabs on menu page
 */
function initMenuTabs() {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  if (!tabButtons.length || !tabContents.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const tabName = this.getAttribute('data-tab');

      // Deactivate all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate selected tab and content
      this.classList.add('active');
      const activeContent = document.querySelector(`[data-tab-content="${tabName}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Set first tab as active by default
  if (tabButtons.length > 0) {
    tabButtons[0].classList.add('active');
    const firstTabName = tabButtons[0].getAttribute('data-tab');
    const firstContent = document.querySelector(`[data-tab-content="${firstTabName}"]`);
    if (firstContent) {
      firstContent.classList.add('active');
    }
  }
}
