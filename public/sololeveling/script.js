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
    const readButton = document.getElementById("readButton");
    const addBookmarkButton = document.getElementById("addBookmark");
    const workId = readButton.dataset.workId;
    const totalChapters = 201;
    const chaptersPerLoad = 10;
    let loadedChapters = 0;
    let isReversed = false;
  
    // Загружаем главы
    function loadChapters(reset = false) {
      if (!chapterList) return;
  
      if (reset) {
        chapterList.innerHTML = "";
        loadedChapters = 0;
      }
  
      const fragment = document.createDocumentFragment();
      const start = isReversed ? totalChapters - loadedChapters : loadedChapters + 1;
      const end = Math.min(
        isReversed ? Math.max(start - chaptersPerLoad + 1, 1) : loadedChapters + chaptersPerLoad,
        totalChapters
      );
  
      for (let i = start; isReversed ? i >= end : i <= end; i += isReversed ? -1 : 1) {
        const chapter = document.createElement("div");
        chapter.classList.add("chapter");
  
        const link = document.createElement("a");
        link.classList.add("chapter-link");
        link.href = `./chapters/${i}/index.html`;
        link.textContent = `Глава ${i}`;
        link.dataset.chapter = i;
  
        chapter.appendChild(link);
        fragment.appendChild(chapter);
      }
  
      chapterList.appendChild(fragment);
      loadedChapters += chaptersPerLoad;
    }
  
    // Прокрутка для подгрузки
    if (chapterList) {
      chapterList.addEventListener("scroll", () => {
        const scrollBuffer = 10;
        if (
          chapterList.scrollTop + chapterList.clientHeight >=
          chapterList.scrollHeight - scrollBuffer
        ) {
          if (loadedChapters < totalChapters) {
            loadChapters();
          }
        }
      });
    }
  
    // Кнопка реверса
    if (reverseButton) {
      reverseButton.addEventListener("click", () => {
        isReversed = !isReversed;
        reverseButton.textContent = isReversed ? "Показать с начала" : "Показать с конца";
        loadChapters(true);
      });
    }
  
    // Прогресс чтения
    const userProgress = JSON.parse(localStorage.getItem("readingProgress")) || {};
    const lastChapter = userProgress[workId] || 1;
  
    if (readButton) {
      readButton.href = `./chapters/${lastChapter}/index.html`;
  
      document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("chapter-link")) {
          const chapterNumber = parseInt(e.target.dataset.chapter, 10);
          userProgress[workId] = chapterNumber;
          localStorage.setItem("readingProgress", JSON.stringify(userProgress));
        }
      });
    }
  
    // Добавление в закладки
    if (addBookmarkButton) {
      addBookmarkButton.addEventListener("click", () => {
        const bookmark = {
          id: workId,
          title: addBookmarkButton.dataset.workTitle,
          link: addBookmarkButton.dataset.workLink,
          image: addBookmarkButton.dataset.workImg,
        };
  
        const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        if (!bookmarks.some((b) => b.id === workId)) {
          bookmarks.push(bookmark);
          localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
          alert("Добавлено в закладки!");
        } else {
          alert("Этот тайтл уже в закладках.");
        }
      });
    }
  
    // Первая загрузка глав
    loadChapters();
  });  