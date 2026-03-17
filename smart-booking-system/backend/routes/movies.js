const express = require('express');

const router = express.Router();

const { getMovies, getLocations, bookMovie } = require('../controllers/movieController');

const auth = require('../middleware/auth');

router.get('/', getMovies);
router.get('/locations', getLocations);

router.post('/book', auth, bookMovie);

module.exports = router;