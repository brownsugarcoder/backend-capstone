
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, 'Destination is required.'],
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required.'],
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required.'],
    min: [1, 'Number of people must be at least 1.'],
  },
  description: {
    type: String,
  },
});

const Trip = mongoose.model('Trip', tripSchema);
export default Trip;