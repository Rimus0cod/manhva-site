const container = document.querySelector('.conteiner');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Переключение между регистрацией и входом
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, email, password }),
        });

        if (!response.ok) throw new Error('Registration failed');
        const data = await response.json();

        // Сохраняем токен и перенаправляем
        localStorage.setItem('token', data.token);
        window.location.href = '/public/profile/profile.html';
    } catch (error) {
        console.error(error);
        alert('Error registering');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();

        // Сохраняем токен и перенаправляем
        localStorage.setItem('token', data.token);
        window.location.href = '/public/profile/profile.html';
    } catch (error) {
        console.error(error);
        alert('Error logging in');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        // Проверка токена (например, запрос к серверу для его валидации)
        fetch('http://localhost:5000/api/auth/validate', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            if (response.ok) {
                // Если токен валиден, перенаправляем на профиль
                window.location.href = '/public/profile/profile.html';
            } else {
                // Если токен недействителен, удаляем его и остаёмся на регистрации
                localStorage.removeItem('token');
            }
        })
        .catch(err => {
            console.error('Validation error:', err);
            localStorage.removeItem('token');
        });
    }
});