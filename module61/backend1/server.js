const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with Atlas
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MongoDB connection string is missing. Please check your .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Atlas connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
  process.exit(1);
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/bookings', require('./routes/bookings'));

// Basic route to test connection
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});