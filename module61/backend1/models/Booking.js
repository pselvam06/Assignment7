const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  passengers: [{
    name: String,
    age: Number
  }],
  contactNumber: {
    type: String,
    required: true
  },
  totalPassengers: {
    type: Number,
    required: true
  },
  assistanceRequired: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);