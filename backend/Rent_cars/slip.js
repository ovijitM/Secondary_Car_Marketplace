import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();
import { ObjectId } from "mongodb";

// Route to fetch slip details by carId
router.post("/slip", async (req, res) => {
  const { carId, number } = req.params; // Extract carId and number from route parameters

  try {
    const db = await connectToDatabase();

    // Collections
    const bookingCollection = db.collection("Book_car");
    const carCollection = db.collection("Rent_Cars");

    // Fetch booking details by carId and number
    const bookingDetails = await bookingCollection.findOne({
      carId: new ObjectId(carId), // Ensure carId is properly cast to ObjectId
      number: number, // Match the user number
    });

    // Fetch car details by carId
    const carDetails = await carCollection.findOne({
      _id: new ObjectId(carId),
    });

    // Check if both booking and car details are available
    if (!bookingDetails || !carDetails) {
      return res.status(404).json({
        success: false,
        message:
          "No booking or car details found for the provided carId and number",
      });
    }

    // Send successful response
    return res.status(200).json({
      success: true,
      data: {
        booking: bookingDetails,
        car: carDetails,
      },
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
