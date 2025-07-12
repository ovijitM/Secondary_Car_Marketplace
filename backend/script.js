import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./createuser/createuser.js";
import checkUser from "./validateuser/logincheck.js";
import search from "./Search/search.js";
import verifyuser from "./createuser/verifyuser.js";
import filter from "./Search/filtercar.js";
import insurance from "./insurance.js";
import repairhistory from "./repairhistory.js";

import displaydata from "./displaydata.js";
import user_history from "./userhistory.js";
import rentCar from "./Rent_cars/rent.js";
import book from "./Booking_car/book_c.js";
import dri from "./Rent_cars/driverinfo.js";
import admin_booking from "./Rent_cars/bookcon.js";
import assignDriver from "./Rent_cars/driver_assin.js";
import admin_data from "./validateuser/admin_data.js";
import kyc from "./validateuser/kyc_approve.js";

// Load environment variables
dotenv.config();

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8000;
const app = Express();

// Middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Serve static files from uploads directory
app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

app.use("/api", userRoutes);
app.use("/api", checkUser);
app.use("/api", search);
app.use("/api", filter);
app.use("/api", displaydata);
app.use("/api", user_history);
app.use("/api", rentCar);
app.use("/api", book);
app.use("/api", dri);
app.use("/api", admin_booking);
app.use("/api", assignDriver);
app.use("/api", verifyuser);
app.use("/api", admin_data);
app.use("/api", insurance);
app.use("/api", repairhistory);
app.use('/api', kyc);



// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message 
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});
