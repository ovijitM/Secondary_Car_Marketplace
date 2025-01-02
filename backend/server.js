import express from 'express';
import cors from 'cors';
import dbConnect from './config/db.js'; // Database connection

// Import routes
import userRoutes from './routes/userRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import partRoutes from './routes/partRoutes.js';
import bookingApiRoutes from './routes/bookingApiRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // New Order Routes

const app = express();

// Hardcoded configurations
const PORT = 8000;
const FRONTEND_URL = 'http://localhost:5173'; // Replace with your frontend URL

// CORS middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
dbConnect()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if the database connection fails
  });

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/parts', partRoutes);
app.use('/api/bookings', bookingApiRoutes); // Booking routes
app.use('/api/orders', orderRoutes); // New Order routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
