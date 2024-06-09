const db = require('../config/db');

exports.createnote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.user_id;
        await db('notes').insert({ title, content, user_id: userId });
        res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.editnote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.user_id;
        await db('notes').where({ note_id: id, user_id: userId }).update({ title, content });
        res.status(200).json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getallnotes = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const notes = await db('notes').select('*').where({ user_id: userId });
        res.status(200).json(notes || []);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deletenote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.user_id;
        await db('notes').where({ note_id: id, user_id: userId }).del();
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
