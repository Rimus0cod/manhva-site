const Bookmark = require('../models/Bookmark');

// Получение всех закладок пользователя
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id });
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookmarks' });
    }
};

// Добавление новой закладки
const addBookmark = async (req, res) => {
    const { contentId, contentType } = req.body;

    if (!contentId || !contentType) {
        return res.status(400).json({ message: 'Content ID and type are required' });
    }

    try {
        const newBookmark = new Bookmark({
            user: req.user.id,
            contentId,
            contentType
        });

        await newBookmark.save();
        res.status(201).json(newBookmark);
    } catch (error) {
        res.status(500).json({ message: 'Error adding bookmark' });
    }
};

// Удаление закладки
const deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);

        if (!bookmark || bookmark.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        await bookmark.remove();
        res.status(200).json({ message: 'Bookmark removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bookmark' });
    }
};

module.exports = { getBookmarks, addBookmark, deleteBookmark };