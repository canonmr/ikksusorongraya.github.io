/* ============================================
   IKKSU Sorong Raya — Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Elements ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal');

  // --- Mobile Menu Toggle ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Navbar Scroll Effect ---
  let lastScroll = 0;
  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  // --- Active Nav Link Highlight ---
  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  // --- Scroll Reveal (Intersection Observer) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // --- Scroll Events (throttled) ---
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavScroll();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offsetTop = targetEl.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80);
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Initial state ---
  handleNavScroll();
  updateActiveLink();

});
