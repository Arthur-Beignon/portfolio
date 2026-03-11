/* ══════════════════════════════════════════════════
   PORTFOLIO — script.js
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
let lastY   = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const y = window.scrollY;
            if (y > 80) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
            lastY   = y;
            ticking = false;
        });
        ticking = true;
    }
});

/* ── Skill bar animation on hover (touch-safe) ───── */
// For touch devices: toggle on tap instead of hover
if ('ontouchstart' in window) {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('touch-active');
        });
    });
}