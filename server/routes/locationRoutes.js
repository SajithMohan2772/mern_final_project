const express = require('express');
const router = express.Router();
const Location = require('../Database/models/location');
const { getCurrentUser } = require('../Middleware/auth');
const Appointment = require('../Database/models/appointment');

// // Create a new location
router.post('/', async (req, res) => {
  try {
    const { name, userId, price, city } = req.body; // Destructuring data from request body
    const newLocation = await Location.create({ name, userId, price, city });
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a location by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, userId, price, city } = req.body; // Destructuring data from request body
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      { name, userId, price, city },
      { new: true }
    );
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a location by ID
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Delete appointments associated with the deleted location
    await Appointment.deleteMany({ locationId: req.params.id });

    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
