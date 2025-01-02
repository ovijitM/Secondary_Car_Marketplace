import express from "express";
import Order from "../dataModels/orderdata.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { product, customer, total } = req.body;

    // Create and save the new order
    const order = new Order({ product, customer, total });
    await order.save();

    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get a specific order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router; // Ensure this is a default export
