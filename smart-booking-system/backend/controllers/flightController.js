const { getDb, createId } = require('../db');

exports.searchFlights = async (req, res) => {

  const { from, to, date } = req.query;

  try {
    const db = getDb();
    const flights = db.data.flights.filter(f => f.from === from && f.to === to && f.date === date);
    res.json(flights);
  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};

exports.bookFlight = async (req, res) => {

  const { flightId } = req.body;

  try {
    const db = getDb();
    const flight = db.data.flights.find(f => f._id === flightId);

    if (!flight) return res.status(404).json({ msg: 'Flight not found' });

    db.data.bookings.push({
      _id: createId('booking'),
      user: req.user.id,
      type: 'flight',
      flight: flightId,
      date: new Date().toISOString()
    });

    await db.write();

    res.json({ msg: 'Booking successful' });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};