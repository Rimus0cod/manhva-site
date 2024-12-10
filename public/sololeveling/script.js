// Получаем все вкладки и содержимое
const tabs = document.querySelectorAll('.slider-tab');
const contents = document.querySelectorAll('.slider-content');

// Добавляем обработчики событий для вкладок
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активные классы у всех вкладок и содержимого
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Добавляем активный класс к текущей вкладке и её содержимому
        tab.classList.add('active');
        const target = document.getElementById(tab.getAttribute('data-target'));
        target.classList.add('active');
    });
});

const btn = document.querySelector('.more')
const text = document.querySelector('.hidden-text')

btn.addEventListener('click', () => {
    // Проверяем, скрыт ли текст
    if (text.style.display === 'none') {
      text.style.display = 'inline'; // Показываем текст
      btn.textContent = 'Меньше';   // Меняем текст кнопки
    } else {
      text.style.display = 'none';  // Скрываем текст
      btn.textContent = 'Больше';   // Меняем текст кнопки обратно
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const chapterList = document.getElementById("chapter-list");
    const reverseButton = document.getElementById("reverse-list");
  
    // Проверка на наличие элементов
    if (!chapterList || !reverseButton) {
      console.error("Элементы chapter-list или reverse-list не найдены!");
      return;
    }
  
    const totalChapters = 201; // Общее количество глав
    const chaptersPerLoad = 10; // Сколько глав загружаем за раз
    let loadedChapters = 0; // Сколько уже загружено
    let isReversed = false; // Режим отображения (обычный/обратный)
  
    // Функция для загрузки глав
    function loadChapters(reset = false) {
      if (reset) {
        chapterList.innerHTML = ""; // Очищаем список перед перезагрузкой
        loadedChapters = 0; // Сбрасываем количество загруженных
      }
  
      const fragment = document.createDocumentFragment();
      const start = isReversed
        ? totalChapters - loadedChapters
        : loadedChapters + 1;
      const end = Math.min(
        isReversed
          ? Math.max(start - chaptersPerLoad + 1, 1)
          : loadedChapters + chaptersPerLoad,
        totalChapters
      );
  
      for (let i = start; isReversed ? i >= end : i <= end; i += isReversed ? -1 : 1) {
        const chapter = document.createElement("div");
        chapter.classList.add("chapter");
  
        const link = document.createElement("a");
        link.href = `http://127.0.0.1:5500/public/sololeveling/chapters/${i}/index.html`;
        link.textContent = `Глава ${i}`;
  
        chapter.appendChild(link);
        fragment.appendChild(chapter);
      }
  
      chapterList.appendChild(fragment);
      loadedChapters += chaptersPerLoad;
    }
  
    // Первая загрузка глав
    loadChapters();
  
    // Прокрутка для подгрузки
    chapterList.addEventListener("scroll", () => {
      const scrollBuffer = 10; // Запас для последней прокрутки
      if (
        chapterList.scrollTop + chapterList.clientHeight >=
        chapterList.scrollHeight - scrollBuffer
      ) {
        if (loadedChapters < totalChapters) {
          loadChapters();
        }
      }
    });
  
    // Обработчик кнопки реверсии
    reverseButton.addEventListener("click", () => {
      isReversed = !isReversed; // Меняем режим отображения
      reverseButton.textContent = isReversed ? "Показать с начала" : "Показать с конца";
      loadChapters(true); // Полная перезагрузка списка
    });
  });  