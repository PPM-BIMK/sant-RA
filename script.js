// static build-time stamp in the footer, drawing-sheet style
const now = new Date();
const pad = n => String(n).padStart(2, '0');
document.getElementById('clock').textContent =
  `SIST OPPDATERT ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;

// clicking a card is where routing to the real project page will hook in later
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Valgt prosjekt:', card.dataset.project);
    // TODO: naviger til /prosjekt/sandra eller /prosjekt/vallora når side 2 er klar
  });
});
