import express from 'express';
import cors from 'cors';
import db from './config/db.js'; // Database connection file

// Initialize the app
const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true // Allow credentials
}));

// Middleware for parsing JSON
app.use(express.json());

// Import routes
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import partRoutes from './routes/partRoutes.js';
import bookingApiRoutes from './routes/bookingApiRoutes.js';

// Connect to the database
db();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/bookings', bookingApiRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
