/* ══════════════════════════════════════════════════
   PORTFOLIO FR — script.js
   ══════════════════════════════════════════════════ */

/* ── Hamburger ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

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

/* ── Header scroll ───────────────────────────────── */
const header = document.getElementById('header');
let ticking  = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            header.classList.toggle('visible', window.scrollY > 80);
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
  const projects = document.querySelectorAll(".project-card");

  // Sécurité : si rien trouvé, on stop
  if (!filterBtns.length || !projects.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      // 🔹 Gestion du bouton actif
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // 🔹 Récupère le filtre
      const filter = btn.dataset.filter;

      // 🔹 Filtrage des projets
      projects.forEach(project => {
        const category = project.dataset.category;

        if (filter === "all" || category === filter) {
          project.style.display = "block";

          // Animation légère
          project.style.opacity = "0";
          setTimeout(() => {
            project.style.opacity = "1";
          }, 50);

        } else {
          project.style.opacity = "0";
          setTimeout(() => {
            project.style.display = "none";
          }, 200);
        }
      });

    });
  });

});