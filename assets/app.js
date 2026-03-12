const searchInput = document.getElementById('searchInput');
const posts = Array.from(document.querySelectorAll('.post'));
const themeToggle = document.getElementById('themeToggle');
const themeKey = 'mumu-theme-light';

// 搜索：直接搜索整条帖子全文（含原文、翻译、作者、来源）
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  posts.forEach((post) => {
    const haystack = `${post.innerText} ${(post.dataset.tags || '')}`.toLowerCase();
    post.style.display = !q || haystack.includes(q) ? '' : 'none';
  });
});

// 初始化主题
const applyTheme = (light) => {
  if (light) {
    document.documentElement.classList.add('light');
    themeToggle.textContent = '🌙';
    localStorage.setItem(themeKey, '1');
  } else {
    document.documentElement.classList.remove('light');
    themeToggle.textContent = '☀️';
    localStorage.setItem(themeKey, '0');
  }
};

if (localStorage.getItem(themeKey) === '1') {
  applyTheme(true);
} else {
  applyTheme(false);
}

// 切换日间/夜间模式
themeToggle?.addEventListener('click', () => {
  const isLight = document.documentElement.classList.contains('light');
  applyTheme(!isLight);
});
