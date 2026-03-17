const mongoose = require('mongoose');

const Movie = require('./models/Movie');

const Flight = require('./models/Flight');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedMovies = async () => {

  const movies = [

    {

      name: 'Avengers: Endgame',

      genre: 'Action',

      duration: '3h 1m',

      theatre: 'Cinema 1',

      showTime: '7:00 PM',

      poster: 'https://via.placeholder.com/150',

      seats: [

        { row: 'A', number: 1, available: true },

        { row: 'A', number: 2, available: true },

        { row: 'A', number: 3, available: true },

        { row: 'B', number: 1, available: true },

        { row: 'B', number: 2, available: true },

        { row: 'B', number: 3, available: true },

      ]

    },

    {

      name: 'The Lion King',

      genre: 'Animation',

      duration: '1h 58m',

      theatre: 'Cinema 2',

      showTime: '5:00 PM',

      poster: 'https://via.placeholder.com/150',

      seats: [

        { row: 'A', number: 1, available: true },

        { row: 'A', number: 2, available: true },

        { row: 'B', number: 1, available: true },

        { row: 'B', number: 2, available: true },

      ]

    }

  ];

  await Movie.insertMany(movies);

  console.log('Movies seeded');

};

const seedFlights = async () => {

  const flights = [

    {

      airline: 'Air India',

      from: 'Delhi',

      to: 'Mumbai',

      departureTime: '10:00 AM',

      arrivalTime: '12:00 PM',

      price: 5000,

      date: new Date('2023-12-01')

    },

    {

      airline: 'Indigo',

      from: 'Delhi',

      to: 'Bangalore',

      departureTime: '2:00 PM',

      arrivalTime: '4:00 PM',

      price: 6000,

      date: new Date('2023-12-01')

    }

  ];

  await Flight.insertMany(flights);

  console.log('Flights seeded');

};

const seed = async () => {

  await seedMovies();

  await seedFlights();

  mongoose.connection.close();

};

seed();