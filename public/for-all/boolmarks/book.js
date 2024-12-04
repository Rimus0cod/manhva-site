document.addEventListener("DOMContentLoaded", () => {
    const bookmarkButton = document.getElementById("addBookmark");
  
    // Проверяем, есть ли сохранённые закладки
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  
    // Получение данных тайтла, картинки и ссылки из атрибутов кнопки
    const title = bookmarkButton.dataset.workTitle;
    const link = bookmarkButton.dataset.workLink;
    const img = bookmarkButton.dataset.workImg;
  
    // Проверяем, есть ли текущий тайтл в закладках
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === title);
    updateButtonState(isBookmarked);
  
    // Обработчик клика по кнопке
    bookmarkButton.addEventListener("click", () => {
      const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.title === title);
  
      if (bookmarkIndex === -1) {
        // Добавление закладки
        bookmarks.push({ title, link, img });
      } else {
        // Удаление закладки
        bookmarks.splice(bookmarkIndex, 1);
      }
  
      // Сохранение закладок в localStorage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  
      // Обновление состояния кнопки
      updateButtonState(bookmarkIndex === -1);
    });
  
    // Функция обновления состояния кнопки
    function updateButtonState(isBookmarked) {
      bookmarkButton.textContent = isBookmarked ? "В закладках" : "Добавить в закладки";
    }
  });