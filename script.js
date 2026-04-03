document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initSmoothScrolling();
  initAnimations();
  initMobileMenu();
  initScrollEffects();
  initImageLoading();
});

function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  window.addEventListener("scroll", function () {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu) navMenu.classList.remove("active");
      if (navToggle) navToggle.classList.remove("active");
    });
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });
}

function initAnimations() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".feature-card, .screenshot").forEach(function (el) {
    observer.observe(el);
  });
}

function initMobileMenu() {
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  document.addEventListener("click", function (e) {
    if (!navToggle || !navMenu) return;
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

function initScrollEffects() {
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener("scroll", function () {
    var current = "";
    var scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

function initImageLoading() {
  document.querySelectorAll("img").forEach(function (img) {
    function markLoaded() {
      img.classList.add("loaded");
    }
    img.addEventListener("load", markLoaded);
    if (img.complete) markLoaded();
    img.addEventListener("error", function () {
      console.warn("Failed to load image:", img.src);
    });
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  var navMenu = document.querySelector(".nav-menu");
  var navToggle = document.querySelector(".nav-toggle");
  if (navMenu && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    if (navToggle) navToggle.classList.remove("active");
  }
});
