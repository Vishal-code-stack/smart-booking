const express = require('express');

const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const { initDb } = require('./db');

async function start() {
  await initDb();
}

const authRoutes = require('./routes/auth');

const movieRoutes = require('./routes/movies');

const flightRoutes = require('./routes/flights');

const bookingRoutes = require('./routes/bookings');
const resetRoutes = require('./routes/reset');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reset', resetRoutes);

const PORT = process.env.PORT || 5000;

start()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });