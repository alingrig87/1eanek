const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  date: String,
  time: String,
  event: String,
  buyIn: Number,
  gtd: Number,
  reentries: Number,
  totalCost: Number,
  winnings: Number,
  profit: Number
});

module.exports = mongoose.model('Tournament', tournamentSchema);
