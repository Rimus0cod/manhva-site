const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Подключение к базе данных
connectDB();

// Включаем CORS и разрешаем запросы с твоего фронтенда
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Разрешаем запросы с фронтенда
    credentials: true, // Если нужны куки и заголовки авторизации
}));

// Позволяет серверу обрабатывать JSON-запросы
app.use(express.json());

// Регистрация маршрутов
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});