import express from "express";
import addUser from "./booking.js";
import connectToDatabase from "../database.js";

const router = express.Router();

router.post("/book", async (req, res) => {
  const { name, number, PickUp, Where_to_go } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection("Book_car");
    const existingUser = await collection.findOne({ number });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User  with this phone number already exists",
      });
    }

    const result = await addUser({ name, number, PickUp, Where_to_go });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to add user",
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
