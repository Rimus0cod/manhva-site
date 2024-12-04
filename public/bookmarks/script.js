document.addEventListener("DOMContentLoaded", () => {
    const bookmarkList = document.getElementById("bookmarkList");

    // Получаем закладки из localStorage
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarks.length === 0) {
      bookmarkList.innerHTML = "<p>Закладок пока нет.</p>";
      return;
    }

    // Отображение всех закладок
    bookmarks.forEach(bookmark => {
      const card = document.createElement("div");
      card.classList.add("bookmark-card");

      const img = document.createElement("img");
      img.src = bookmark.img;
      img.alt = bookmark.title;

      const title = document.createElement("h3");
      title.textContent = bookmark.title;

      const link = document.createElement("a");
      link.href = bookmark.link;
      link.textContent = "Перейти к тайтлу";

      const removeButton = document.createElement("button");
      removeButton.textContent = "Удалить";
      removeButton.addEventListener("click", () => {
        removeBookmark(bookmark.title);
        card.remove();
        if (bookmarkList.children.length === 0) {
          bookmarkList.innerHTML = "<p>Закладок пока нет.</p>";
        }
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(link);
      card.appendChild(removeButton);
      bookmarkList.appendChild(card);
    });

    // Функция удаления закладки
    function removeBookmark(title) {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }
  });