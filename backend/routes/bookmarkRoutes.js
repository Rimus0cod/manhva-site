const express = require('express');
const { getBookmarks, addBookmark, deleteBookmark } = require('../controllers/bookmarkController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Защищённые маршруты для закладок
router.get('/', verifyToken, getBookmarks); // Получение всех закладок пользователя
router.post('/', verifyToken, addBookmark); // Добавление новой закладки
router.delete('/:id', verifyToken, deleteBookmark); // Удаление закладки

module.exports = router;