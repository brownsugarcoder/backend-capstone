const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

//GET all trips


//CREATE(POST) a new Trip

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

//PUT. Update a trip

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

  module.exports = router;