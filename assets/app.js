const searchInput = document.getElementById('searchInput');
const posts = Array.from(document.querySelectorAll('.post'));
const themeToggle = document.getElementById('themeToggle');
const themeKey = 'mumu-theme-light';
const filterTrigger = document.getElementById('filterDropdownTrigger');
const filterDropdown = document.getElementById('typeFilterDropdown');
const filterItems = Array.from(document.querySelectorAll('.dropdown-item'));
const currentFilterIcon = document.getElementById('currentFilterIcon');
const filterStatus = document.getElementById('filterStatus');
const currentFilterLabel = document.getElementById('currentFilterLabel');
const clearFilter = document.getElementById('clearFilter');

let activeType = 'all';

function applyTheme(light) {
  if (light) {
    document.documentElement.classList.add('light');
    themeToggle.textContent = '🌙';
    localStorage.setItem(themeKey, '1');
  } else {
    document.documentElement.classList.remove('light');
    themeToggle.textContent = '☀️';
    localStorage.setItem(themeKey, '0');
  }
}

function applyFilters() {
  const q = (searchInput?.value || '').trim().toLowerCase();
  posts.forEach((post) => {
    const haystack = `${post.innerText} ${(post.dataset.tags || '')}`.toLowerCase();
    const typeOk = activeType === 'all' || post.dataset.type === activeType;
    const textOk = !q || haystack.includes(q);
    post.style.display = typeOk && textOk ? '' : 'none';
  });

  if (activeType === 'all') {
    filterStatus?.classList.remove('show');
    currentFilterLabel.textContent = 'All';
    currentFilterIcon.textContent = '📑';
  } else {
    filterStatus?.classList.add('show');
    currentFilterLabel.textContent = activeType === 'repost' ? 'Repost' : 'Original';
    currentFilterIcon.textContent = activeType === 'repost' ? '🔄' : '📝';
  }
}

searchInput?.addEventListener('input', applyFilters);

if (localStorage.getItem(themeKey) === '1') applyTheme(true); else applyTheme(false);
themeToggle?.addEventListener('click', () => applyTheme(!document.documentElement.classList.contains('light')));

filterTrigger?.addEventListener('click', (e) => {
  e.stopPropagation();
  filterTrigger.classList.toggle('open');
});

document.addEventListener('click', () => filterTrigger?.classList.remove('open'));
filterDropdown?.addEventListener('click', (e) => e.stopPropagation());

filterItems.forEach((item) => {
  item.addEventListener('click', () => {
    filterItems.forEach((x) => x.classList.remove('active'));
    item.classList.add('active');
    activeType = item.dataset.type;
    filterTrigger.classList.remove('open');
    applyFilters();
  });
});

clearFilter?.addEventListener('click', () => {
  activeType = 'all';
  filterItems.forEach((x) => x.classList.toggle('active', x.dataset.type === 'all'));
  applyFilters();
});

applyFilters();