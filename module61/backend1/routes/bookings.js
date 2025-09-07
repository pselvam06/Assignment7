const express = require('express');
const { protect, admin } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const router = express.Router();

// Get all bookings (admin) or user's bookings (passenger)
router.get('/', protect, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'admin') {
      bookings = await Booking.find().populate('passenger', 'name email').populate('flight');
    } else {
      bookings = await Booking.find({ passenger: req.user._id }).populate('flight');
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', protect, async (req, res) => {
  try {
    const flight = await Flight.findById(req.body.flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.seatsAvailable < req.body.totalPassengers) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      passenger: req.user._id,
      flight: req.body.flightId,
      passengers: req.body.passengers,
      contactNumber: req.body.contactNumber,
      totalPassengers: req.body.totalPassengers,
      assistanceRequired: req.body.assistanceRequired,
      totalAmount: flight.price * req.body.totalPassengers
    });

    // Update available seats
    flight.seatsAvailable -= req.body.totalPassengers;
    await flight.save();

    const savedBooking = await booking.save();
    await savedBooking.populate('flight');
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status (admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('passenger', 'name email').populate('flight');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single booking
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('passenger', 'name email')
      .populate('flight');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (req.user.role !== 'admin' && booking.passenger._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;