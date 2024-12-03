document.addEventListener("DOMContentLoaded", () => {
  const bookmarksContainer = document.querySelector("#bookmarks-container");

  // Получаем закладки из LocalStorage
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  if (bookmarks.length === 0) {
    bookmarksContainer.innerHTML = "<p>Закладок пока нет.</p>";
    return;
  }

  // Создаём элементы для каждой закладки
  bookmarks.forEach(bookmark => {
    const card = document.createElement("div");
    card.classList.add("bookmark-card");

    const img = document.createElement("img");
    img.src = bookmark.image;
    img.alt = bookmark.title;

    const title = document.createElement("h2");
    title.textContent = bookmark.title;

    const link = document.createElement("a");
    link.href = bookmark.link;
    link.textContent = "Читать";
    link.target = "_blank"; // Открытие в новой вкладке

    // Добавляем элементы в карточку
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(link);

    // Добавляем карточку в контейнер
    bookmarksContainer.appendChild(card);
  });
});