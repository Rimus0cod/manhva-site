const form = document.getElementById('registerForm');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            };

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    alert('Реєстрація пройшла успішно!');
                    window.location.href = '/login'; // Перенаправлення на сторінку входу
                } else {
                    const error = await response.json();
                    alert(`Помилка: ${error.message}`);
                }
            } catch (err) {
                alert('Виникла помилка під час реєстрації. Спробуйте ще раз.');
                console.error(err);
            }
        });