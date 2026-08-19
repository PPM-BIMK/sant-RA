// static build-time stamp in the footer, drawing-sheet style
const now = new Date();
const pad = n => String(n).padStart(2, '0');
document.getElementById('clock').textContent =
  `SIST OPPDATERT ${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
