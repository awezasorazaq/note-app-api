const express = require('express');
const router = express.Router();
const { createnote, editnote, getallnotes, deletenote } = require('../controller/notesController');
const authenticateUser = require('../config/auth');

router.post('/createnote', authenticateUser, createnote);
router.put('/editnote/:id', authenticateUser, editnote);
router.get('/getallnotes', authenticateUser, getallnotes);
router.delete('/deletenote/:id', authenticateUser, deletenote);

module.exports = router;
