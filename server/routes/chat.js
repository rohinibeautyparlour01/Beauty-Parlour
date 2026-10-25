const express = require('express');
const { getReply, DEFAULT_CHIPS } = require('../utils/chatbot');

const router = express.Router();

router.get('/welcome', (_req, res) => {
  res.json({ ...getReply('hello'), suggestions: DEFAULT_CHIPS });
});

router.post('/', (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string') return res.status(400).json({ reply: 'Please type a message.' });
  res.json(getReply(message));
});

module.exports = router;
