import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

const Service = mongoose.model('Service', ServiceSchema);

export default Service; // Ensure there is a default export
