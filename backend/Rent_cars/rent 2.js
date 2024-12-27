import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

// Endpoint to fetch all data from the Rent_cars table
router.post("/rentCar", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const rent_collection = db.collection("Rent_Cars");
    const rent_car = await rent_collection.find({}).toArray();

    console.log(rent_car);

    res.status(200).json({ success: true, data: rent_car });
  } catch {
    console.log("hi:");
  }
});

export default router;
