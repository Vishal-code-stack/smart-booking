const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  name: { type: String, required: true },

  genre: { type: String, required: true },

  duration: { type: String, required: true },

  theatre: { type: String, required: true },

  showTime: { type: String, required: true },

  poster: { type: String, required: true },

  seats: [{ row: String, number: Number, available: Boolean }]

});

module.exports = mongoose.model('Movie', movieSchema);