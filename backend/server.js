const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Подключаем CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500' // замените на ваш фронтенд
}));

// Подключаем middleware для парсинга JSON
app.use(express.json());

// Подключение к базе данных MongoDB
connectDB();

// Подключение маршрутов
app.use('/api', authRoutes);
const bookmarkRoutes = require('./routes/bookmarkRoutes');

// Подключение маршрутов
app.use('/api/bookmarks', bookmarkRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});