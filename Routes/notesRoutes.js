const express = require('express');
const router = express.Router();
const { createNote, editNote, getAllNotes, deleteNote } = require('../Controller/notesController');
const authenticateUser = require('../Config/auth');

router.post('/createNote', authenticateUser, createNote);
router.put('/editNote/:id', authenticateUser, editNote);
router.get('/getAllNotes', authenticateUser, getAllNotes);
router.delete('/deleteNote/:id', authenticateUser, deleteNote);

module.exports = router;
