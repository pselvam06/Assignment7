// controllers/flightController.js - Flight controller
const Flight = require('../models/Flight');

// Get all flights with optional filtering
const getFlights = async (req, res) => {
  try {
    const { from, to, date, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (from) filter.from = new RegExp(from, 'i');
    if (to) filter.to = new RegExp(to, 'i');
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.journeyDateTime = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const flights = await Flight.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ journeyDateTime: 1 });

    const total = await Flight.countDocuments(filter);

    res.json({
      flights,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single flight
const getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create flight (Admin only)
const createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update flight (Admin only)
const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete flight (Admin only)
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFlights,
  getFlight,
  createFlight,
  updateFlight,
  deleteFlight
};