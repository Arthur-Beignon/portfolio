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
(function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return; // pas sur la page projets

    const cards       = document.querySelectorAll('.projet-page-card');
    const countEl     = document.querySelector('.projets-results-count');
    const noResults   = document.querySelector('.no-results');

    function updateCount(visible) {
        if (!countEl) return;
        countEl.innerHTML = '<span>' + visible + '</span> projet' + (visible > 1 ? 's' : '') + ' affiché' + (visible > 1 ? 's' : '');
    }

    function filter(cat) {
        let visible = 0;
        cards.forEach(card => {
            const match = cat === 'all' || card.dataset.cat === cat;
            card.classList.toggle('hidden', !match);
            if (match) visible++;
        });
        updateCount(visible);
        if (noResults) noResults.classList.toggle('visible', visible === 0);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filter(btn.dataset.filter);
        });
    });

    // Init : afficher tout
    updateCount(cards.length);
})();