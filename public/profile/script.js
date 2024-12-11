document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

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