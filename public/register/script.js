const container = document.querySelector('.conteiner');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                localStorage.setItem('token', data.token); // Сохранение токена
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    });

    const token = localStorage.getItem('token');

if (token) {
    fetch('/public/profile/index.html', {
        headers: { Authorization: token },
    })
    .then(response => response.json())
    .then(data => {
        if (data.profile) {
            // Перенаправить на профиль
            window.location.href = '/profile';
        }
    });
}

