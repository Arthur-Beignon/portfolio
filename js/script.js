/* ══════════════════════════════════════════════════
   PORTFOLIO FR — script.js
   ══════════════════════════════════════════════════ */

/* ── Hamburger ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ── Header scroll ───────────────────────────────── */
const header = document.getElementById('header');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      if (header) header.classList.toggle('visible', window.scrollY > 80);
      ticking = false;
    });
    ticking = true;
  }
});

/* ══════════════════════════════════════════════════
   PAGE PROJETS — filtres
   ══════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".projet-page-card");

  if (!filterBtns.length || !projects.length) return;

  const countEl = document.querySelector(".projets-results-count");
  const noResults = document.querySelector(".no-results");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      let visible = 0;

      projects.forEach(project => {
        const match = filter === "all" || project.dataset.category === filter;
        project.classList.toggle("hidden", !match);
        if (match) visible++;
      });

      if (countEl) {
        countEl.innerHTML = filter === "all"
          ? `<span>${visible}</span> projets au total`
          : `<span>${visible}</span> projet${visible > 1 ? "s" : ""} en <strong>${btn.textContent.trim()}</strong>`;
      }
      if (noResults) noResults.classList.toggle("visible", visible === 0);
    });
  });
});