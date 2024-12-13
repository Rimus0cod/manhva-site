document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkList = document.getElementById("bookmarkList");

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
    function removeBookmark(title) {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.title !== title);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    }

    // Проверяем, есть ли токен
    if (!token) {
        alert('You need to log in first!');
        window.location.href = '/public/register/index.html';
        return;
    }

    try {
        // Запрашиваем данные профиля
        const response = await fetch('http://localhost:5000/api/profile', {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const userData = await response.json();

        // Отображаем приветственное сообщение
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${userData.name}!`;
        }

        // Проверяем наличие кнопки "Logout" и привязываем обработчик
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                // Удаляем токен из localStorage
                localStorage.removeItem('token');

                // Перенаправляем на страницу регистрации/логина
                window.location.href = '/public/register/index.html';
            });
        } else {
            console.error('Logout button not found in the DOM');
        }
    } catch (error) {
        console.error('Profile loading error:', error);
        localStorage.removeItem('token'); // Удаляем некорректный токен
        window.location.href = '/public/register/index.html';
    }
});

  const params = new URLSearchParams(window.location.search);
  const userName = params.get("name");
  if (userName) {
    document.getElementById("welcome").textContent = `Добро пожаловать, ${userName}!`;
  }
