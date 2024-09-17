const express = require('express');
const { chatWithBot } = require('../controllers/chatController');
const router = express.Router();

//router.get('/history', getChatHistory);
router.post('/chat', chatWithBot);

module.exports = router;
