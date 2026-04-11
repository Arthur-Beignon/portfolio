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
   FORMULAIRE DE CONTACT — Formspree
   ══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('.btn-send');
    const btnText = btn.querySelector('span');
    const originalText = btnText.textContent;

    btnText.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showPopup('success');
        form.reset();
      } else {
        showPopup('error');
      }
    } catch {
      showPopup('error');
    } finally {
      btnText.textContent = originalText;
      btn.disabled = false;
    }
  });
});

function showPopup(type) {
  const existing = document.getElementById('cf-popup');
  if (existing) existing.remove();

  const isSuccess = type === 'success';

  const overlay = document.createElement('div');
  overlay.id = 'cf-popup';
  overlay.style.cssText = `
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
    animation: cfFadeIn 0.25s ease;
  `;

  overlay.innerHTML = `
    <style>
      @keyframes cfFadeIn  { from { opacity: 0; } to { opacity: 1; } }
      @keyframes cfSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
    <div style="
      background: #fff; border-radius: 16px;
      padding: 2.5rem 2rem; max-width: 360px; width: 90%;
      text-align: center;
      animation: cfSlideUp 0.3s ease;
    ">
      <div style="
        width: 64px; height: 64px; border-radius: 50%;
        background: ${isSuccess ? '#e9f9f0' : '#fdecea'};
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 1.25rem;
      ">
        ${isSuccess
      ? `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    }
      </div>
      <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem; color: #111;">
        ${isSuccess ? 'Message envoyé !' : 'Erreur d\'envoi'}
      </h3>
      <p style="margin: 0 0 1.75rem; color: #666; font-size: 0.9rem; line-height: 1.6;">
        ${isSuccess
      ? 'Votre message a bien été transmis.<br>Je vous répondrai dans les plus brefs délais.'
      : 'Une erreur est survenue lors de l\'envoi.<br>Réessayez ou contactez-moi directement par email.'}
      </p>
      <button id="cf-popup-close" style="
        background: #111; color: #fff; border: none;
        border-radius: 8px; padding: 0.65rem 2rem;
        cursor: pointer; font-size: 0.9rem; font-family: inherit;
        transition: background 0.2s;
      ">Fermer</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('cf-popup-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

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