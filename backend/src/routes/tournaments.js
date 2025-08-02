const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament'); // Ajustează calea dacă fișierul e în altă parte

// 🔸 Create
router.post('/', async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    const savedTournament = await tournament.save();
    res.status(201).json(savedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔸 Read all
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔸 Read one
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Not found' });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔸 Update
router.put('/:id', async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTournament) return res.status(404).json({ message: 'Not found' });
    res.json(updatedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔸 Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!deletedTournament) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
