// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users - Save a text entry
router.post('/', async (req, res) => {
  try {
    const { text, simplifiedText, flowchart, preferences } = req.body;
    const newEntry = new User({ text, simplifiedText, flowchart, preferences });
    const saved = await newEntry.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/users - Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await User.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/users/:id - Get one entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await User.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
