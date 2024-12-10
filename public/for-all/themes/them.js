// Элемент для динамического подключения темы
const themeStyleLink = document.getElementById('theme-style');

// Установка темы на основе localStorage
function applySavedTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  themeStyleLink.setAttribute('href', `${savedTheme}-theme.css`);
}

// Переключение темы
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Применяем новую тему
  themeStyleLink.setAttribute('href', `${newTheme}-theme.css`);

  // Сохраняем выбор в LocalStorage
  localStorage.setItem('theme', newTheme);
}

// Применяем сохранённую тему при загрузке страницы
applySavedTheme();