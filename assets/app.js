const input = document.getElementById('searchInput');
const posts = Array.from(document.querySelectorAll('.post'));
const themeBtn = document.getElementById('themeBtn');

input?.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  posts.forEach((p) => {
    const text = (p.innerText + ' ' + (p.dataset.keywords || '')).toLowerCase();
    p.style.display = text.includes(q) ? '' : 'none';
  });
});

const key = 'mumu-theme-light';
if (localStorage.getItem(key) === '1') document.documentElement.classList.add('light');

themeBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  const on = document.documentElement.classList.contains('light');
  localStorage.setItem(key, on ? '1' : '0');
  themeBtn.textContent = on ? '🌙' : '☀️';
});
