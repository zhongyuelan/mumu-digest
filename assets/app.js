const searchInput = document.getElementById('searchInput');
const posts = Array.from(document.querySelectorAll('.tweet'));
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');

// Search
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  posts.forEach((p) => {
    const text = (p.innerText + ' ' + (p.dataset.tags || '')).toLowerCase();
    p.style.display = text.includes(q) ? '' : 'none';
  });
});

// Theme toggle
const key = 'mumu-theme-light';
if (localStorage.getItem(key) === '1') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.querySelector('.theme-icon').textContent = '🌙';
}

themeToggle?.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
    localStorage.setItem(key, '0');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.querySelector('.theme-icon').textContent = '🌙';
    localStorage.setItem(key, '1');
  }
});

// Back to top
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
