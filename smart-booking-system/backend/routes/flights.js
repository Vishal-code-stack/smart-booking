const express = require('express');

const router = express.Router();

const { searchFlights, bookFlight } = require('../controllers/flightController');

const auth = require('../middleware/auth');

router.get('/search', searchFlights);

router.post('/book', auth, bookFlight);

module.exports = router;