// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI 

app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URI).then (() =>{
  console.log("Database connected.")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
})
.catch((err) => {
console.error('Error connecting to MongoDB:', err.message);
});



// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from the Lincoln Memorial backend!!!');
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password.' });
    }
     
     return res.status(200).json({
      message: 'User logged in successfully.',
     
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
});


