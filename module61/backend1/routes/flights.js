const express = require('express');
const { protect, admin } = require('../middleware/auth');
const Flight = require('../models/Flight');

const router = express.Router();

// Get all flights with optional filtering
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let filter = {};

    if (from) filter.from = new RegExp(from, 'i');
    if (to) filter.to = new RegExp(to, 'i');
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.journeyDateTime = { $gte: startDate, $lt: endDate };
    }

    const flights = await Flight.find(filter).sort({ journeyDateTime: 1 });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single flight
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create flight (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update flight (admin only)
router.put('/:id', protect, admin, async (req, res) => {
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
});

// Delete flight (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json({ message: 'Flight removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;