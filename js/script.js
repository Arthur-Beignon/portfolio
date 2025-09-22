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

