import express from 'express';
const router = express.Router();
import Trip from '../models/Trip.js';

router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Custom-Header');
  res.sendStatus(204); // Send no content, just status
});

// Create a trip
router.post('/', async (req, res) => {
  console.log('recieved post request',req.body)
  try {
    const { destination, visitDate, numberOfPeople, description } = req.body;

    // Validation check
    if (!destination || !visitDate || !numberOfPeople) {
      return res.status(400).json({
        error: 'Please provide destination, visitDate, and numberOfPeople.',
      });
    }

    // Create a new trip
    const trip = new Trip({ destination, visitDate, numberOfPeople, description });
    const savedTrip = await trip.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ message: 'Trip not found' });
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;










































//GET all trips


//CREATE(POST) a new Trip
/*
router.post('/trips', async (req, res) => {
    try {
      const { username, visitDate, numberOfPeople, notes } = req.body;
      if (!username || !visitDate || !numberOfPeople) {
        return res.status(400).json({
          message: 'Username, visitDate, and numberOfPeople are required.',
        });
      }
      const newTrip = new Trip({
        username,
        visitDate,
        numberOfPeople,
        notes,
      });
      await newTrip.save();
      res.status(201).json(newTrip);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error creating trip' });
    }
});
*/

//PUT. Update a trip
/*
router.put('/trips/:id', async (req, res) => {
    try {
      const { visitDate, numberOfPeople, notes } = req.body;
      const updatedTrip = await Trip.findByIdAndUpdate(
        req.params.id,
        { visitDate, numberOfPeople, notes },
        { new: true }
      );
  
      if (!updatedTrip) {
        return res.status(404).json({ message: 'Trip not found.' });
      }
  
      res.json(updatedTrip);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error updating your trip' });
    }
  });

  module.exports = router; */