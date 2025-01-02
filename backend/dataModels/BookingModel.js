import mongoose from 'mongoose';

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  carBrand: { type: String, required: true },
  carModel: { type: String, required: true },
  carNumber: { type: String, required: true },
  services: { type: [String], required: true }, // Array of selected services
  notes: { type: String, required: false },
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
