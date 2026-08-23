/* Silent Organ Speaks — interactions */
(function () {
  "use strict";

  /* ---- Nav: solidify on scroll (waits out the intro curtain, if present) ---- */
  var nav = document.querySelector(".nav");
  var intro = document.querySelector(".intro");
  function navThreshold() {
    return intro ? Math.max(120, intro.offsetHeight * 0.5) : 24;
  }
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > navThreshold()) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.querySelector(".nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("mobile-open");
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("mobile-open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Accordion ---- */
  document.querySelectorAll(".acc__head").forEach(function (head) {
    head.addEventListener("click", function () {
      var item = head.closest(".acc__item");
      var body = item.querySelector(".acc__body");
      var isOpen = item.classList.toggle("open");
      head.setAttribute("aria-expanded", isOpen ? "true" : "false");
      body.style.maxHeight = isOpen ? body.scrollHeight + "px" : null;
    });
  });

  /* ---- Simple form UX (no backend wired) ---- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-status");
      if (note) {
        note.textContent = "Thank you — your message is ready to send. Connect a form service (e.g. Formspree) to receive it.";
        note.style.color = "var(--sage-deep)";
      }
      form.reset();
    });
  });

  /* ---- Buttery scroll parallax on hero blobs ---- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var blobs = document.querySelectorAll(".blob");
  if (!reduceMotion && blobs.length) {
    var ticking = false;
    function parallax() {
      var y = window.scrollY;
      for (var i = 0; i < blobs.length; i++) {
        blobs[i].style.setProperty("--py", (y * (0.08 + i * 0.05)) + "px");
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(parallax); ticking = true; }
    }, { passive: true });
    parallax();
  }

  /* ---- Intro curtain: lift the lockup away as the page scrolls ---- */
  var introInner = intro && intro.querySelector(".intro__inner");
  var introCue = intro && intro.querySelector(".intro__scroll");
  if (introInner && !reduceMotion) {
    var introTicking = false;
    function introShift() {
      var y = window.scrollY;
      var h = intro.offsetHeight || window.innerHeight;
      if (y <= h) {
        var p = y / h;
        introInner.style.transform = "translate3d(0," + (-y * 0.34) + "px,0)";
        var fade = String(Math.max(0, 1 - p * 1.5));
        introInner.style.opacity = fade;
        if (introCue) introCue.style.opacity = String(Math.max(0, 1 - p * 3));
      }
      introTicking = false;
    }
    window.addEventListener("scroll", function () {
      if (!introTicking) { window.requestAnimationFrame(introShift); introTicking = true; }
    }, { passive: true });
    introShift();
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
