const express = require('express');
const { registerUser, loginUser, getUserProfile} = require('../controllers/authController');
const router = express.Router();

// Регистрация
router.post('/register', registerUser);

// Логин
router.post('/login', loginUser);

// Маршрут для получения профиля
router.get('/profile', getUserProfile);
module.exports = router;