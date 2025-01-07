
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  Name: {    
    type: String, 
    required: true 
  },
  visitDate: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
 
});

export default mongoose.model("Trip", tripSchema);