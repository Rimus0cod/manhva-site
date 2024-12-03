const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = '4ff8f05d3fe3cdd6129cb9b295b725f587dd5ffbf28487e1f07f37b6ab3b991a';

// Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Логика регистрации...
});

// Авторизация
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Логика авторизации...
});

module.exports = router;

app.post('/api/register', async (req, res) => {
    const { username, email, password, token } = req.body;

    try {
        // Проверка, авторизован ли пользователь
        if (token) {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                return res.status(200).json({ 
                    message: 'User already logged in', 
                    profile: { username: user.username, email: user.email } 
                });
            }
        }

        // Проверка полей
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Создаем токен
        const newToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            message: 'User registered successfully', 
            token: newToken,
            profile: { username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
