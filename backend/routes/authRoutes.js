const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Регистрация
router.post('/register', registerUser);

// Логин
router.post('/login', loginUser);

module.exports = router;