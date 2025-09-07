const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  flightName: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  journeyDateTime: {
    type: Date,
    required: true
  },
  seatsAvailable: {
    type: Number,
    default: 60
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);