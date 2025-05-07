const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// GET all assets
router.get('/', async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

// POST new asset
router.post('/', async (req, res) => {
  const newAsset = new Asset(req.body);
  const saved = await newAsset.save();
  res.status(201).json(saved);
});

// PUT (update asset by id)
router.put('/:id', async (req, res) => {
  const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE (by id)
router.delete('/:id', async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
