const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => console.log('MongoDB connected'))

  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');

const movieRoutes = require('./routes/movies');

const flightRoutes = require('./routes/flights');

const bookingRoutes = require('./routes/bookings');

app.use('/api/auth', authRoutes);

app.use('/api/movies', movieRoutes);

app.use('/api/flights', flightRoutes);

app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));