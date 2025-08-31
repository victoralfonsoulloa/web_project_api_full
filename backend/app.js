const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/aroundb');

// Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: '68675e9ed53e5d12399f4edf',
  };
  next();
});

// Import routes
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Use routes
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Middleware for non-existent routes
app.use((req, res) => {
  res.status(404).json({ message: 'Requested resource not found' });
});

// Error handler with custom logic
app.use((err, req, res) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Invalid data' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).json({ message: 'Resource not found' });
  }
  // Default to 500
  return res
    .status(500)
    .json({ message: 'An error has occurred on the server' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
