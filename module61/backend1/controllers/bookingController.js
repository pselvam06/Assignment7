// controllers/bookingController.js - Booking controller
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Get all bookings for a user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user._id })
      .populate('flight', 'flightNumber flightName from to journeyDateTime')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('passenger', 'name email contactNumber')
      .populate('flight', 'flightNumber flightName from to journeyDateTime')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { flightId, passengers, contactNumber, email, assistanceRequired } = req.body;
    
    // Check if flight exists
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Check if there are enough seats available
    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Calculate total amount
    const totalAmount = flight.price * passengers.length;

    // Create booking
    const booking = new Booking({
      passenger: req.user._id,
      flight: flightId,
      passengers,
      contactNumber,
      email,
      totalPassengers: passengers.length,
      assistanceRequired: assistanceRequired || false,
      totalAmount
    });

    // Save booking
    const savedBooking = await booking.save();

    // Update available seats
    flight.availableSeats -= passengers.length;
    await flight.save();

    // Populate the booking with flight details
    await savedBooking.populate('flight', 'flightNumber flightName from to journeyDateTime');

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('passenger', 'name email contactNumber')
      .populate('flight', 'flightNumber flightName from to journeyDateTime price');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (req.user.role !== 'admin' && booking.passenger._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status (Admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('flight', 'flightNumber flightName from to journeyDateTime');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to cancel this booking
    if (req.user.role !== 'admin' && booking.passenger.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update available seats if booking was approved
    if (booking.status === 'Approved') {
      const flight = await Flight.findById(booking.flight);
      flight.availableSeats += booking.totalPassengers;
      await flight.save();
    }

    // Update booking status to rejected (cancelled)
    booking.status = 'Rejected';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserBookings,
  getAllBookings,
  createBooking,
  getBooking,
  updateBookingStatus,
  cancelBooking
};