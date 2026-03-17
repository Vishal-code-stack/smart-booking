const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  type: { type: String, enum: ['movie', 'flight'], required: true },

  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },

  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },

  seats: [{ row: String, number: Number }],

  date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Booking', bookingSchema);