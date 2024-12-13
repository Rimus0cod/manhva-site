const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на пользователя
    contentId: { type: String, required: true }, // ID произведения или контента
    contentType: { type: String, required: true }, // Тип контента (например, "book", "movie")
    createdAt: { type: Date, default: Date.now } // Дата добавления
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
