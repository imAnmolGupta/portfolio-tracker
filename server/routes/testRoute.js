const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

router.get('/', async (req, res) => {
  try {
    const data = await Test.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
