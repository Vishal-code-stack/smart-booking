const express = require('express');

const router = express.Router();

const { getBookings } = require('../controllers/bookingController');

const auth = require('../middleware/auth');

router.get('/', auth, getBookings);

module.exports = router;