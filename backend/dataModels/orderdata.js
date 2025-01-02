import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    name: String,
    price: Number,
    quantity: Number,
  },
  customer: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  total: { type: Number, required: true },
  deliveryFee: { type: Number, default: 60 },
  createdAt: { type: Date, default: Date.now },
});

// Export the model as default
const Order = mongoose.model("Order", orderSchema);
export default Order;
