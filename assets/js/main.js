/* Silent Organ Speaks — interactions */
(function () {
  "use strict";

  /* ---- Nav: solidify on scroll ---- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
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

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
