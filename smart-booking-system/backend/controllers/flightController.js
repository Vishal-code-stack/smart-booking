const Flight = require('../models/Flight');

const Booking = require('../models/Booking');

exports.searchFlights = async (req, res) => {

  const { from, to, date } = req.query;

  try {

    const flights = await Flight.find({ from, to, date: new Date(date) });

    res.json(flights);

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};

exports.bookFlight = async (req, res) => {

  const { flightId } = req.body;

  try {

    const flight = await Flight.findById(flightId);

    if (!flight) return res.status(404).json({ msg: 'Flight not found' });

    const booking = new Booking({ user: req.user.id, type: 'flight', flight: flightId });

    await booking.save();

    res.json({ msg: 'Booking successful' });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};