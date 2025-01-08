// server/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
/*const bodyParser = require('body-parser');*/
import tripRoutes from './routes/trips.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only the methods you need
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header','sec-ch-ua', 'sec-ch-ua-mobile', 'sec-ch-ua-platform', 'user-agent'],
   // Include custom headers
  
  preflightContinue: false, // Don't pass the preflight to the next handler
  optionsSuccessStatus: 204, // Return a success status for preflight
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 
 
// Middleware
/* app.use(bodyParser.json()); */

app.use(express.json())
// Routes
app.use('/api/trips', tripRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));














/*
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
*/

