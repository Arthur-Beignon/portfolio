// Animation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Exemple : affichage message formulaire
document.querySelector('form')?.addEventListener('submit', e => {
  e.preventDefault();
  const confirmation = document.createElement('p');
  confirmation.textContent = 'Merci pour votre message !';
  confirmation.style.color = 'green';
  e.target.appendChild(confirmation);
});

const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const header = document.querySelector('header');

  // Animation du menu hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  // Gestion du scroll
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) {
      // vers le bas → cache le header
      header.classList.add('hidden');
    } else {
      // vers le haut → affiche le header
      header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });