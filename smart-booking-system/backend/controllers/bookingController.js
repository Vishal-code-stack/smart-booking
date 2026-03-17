const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({ user: req.user.id }).populate('movie flight');

    res.json(bookings);

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};