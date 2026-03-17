const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({

  airline: { type: String, required: true },

  from: { type: String, required: true },

  to: { type: String, required: true },

  departureTime: { type: String, required: true },

  arrivalTime: { type: String, required: true },

  price: { type: Number, required: true },

  date: { type: Date, required: true }

});

module.exports = mongoose.model('Flight', flightSchema);