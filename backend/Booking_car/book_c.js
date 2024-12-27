import express from "express";
import addUser from "./booking.js";
import connectToDatabase from "../database.js";

const distination = [
  { to: "Dhaka", from: "Khulna", distance: 150 },
  { to: "Dhaka", from: "Cox Bazar", distance: 300 },
];

const router = express.Router();

router.post("/book", async (req, res) => {
  const { name, number, PickUp, Where_to_go } = req.body;

  try {
    // Find the matching route
    const route = distination.find(
      (d) => d.to === PickUp && d.from === Where_to_go
    );

    if (!route) {
      return res.status(400).json({
        success: false,
        message: "Invalid route",
      });
    }

    // Calculate the price
    const price = route.distance * 5;

    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.collection("Book_car");

    // Check if the user already exists
    const existingUser = await collection.findOne({ number });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    // Add the booking to the database
    const result = await addUser({ name, number, PickUp, Where_to_go, price });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to add booking",
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
