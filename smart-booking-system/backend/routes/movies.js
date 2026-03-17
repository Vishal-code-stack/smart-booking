const express = require('express');

const router = express.Router();

const { getMovies, bookMovie } = require('../controllers/movieController');

const auth = require('../middleware/auth');

router.get('/', getMovies);

router.post('/book', auth, bookMovie);

module.exports = router;