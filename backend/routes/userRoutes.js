const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');

const router = express.Router();

// Регистрация
router.post('/api/register', registerUser);

// Авторизация
router.post('/api/login', authUser);

module.exports = router;