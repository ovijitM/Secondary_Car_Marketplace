import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

router.get("/slip/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    const db = await connectToDatabase();

    // Fetch the booking details
    const bookingCollection = db.collection("Book_car");
    const carCollection = db.collection("Rent_Cars");

    // Get the booking and car details
    const bookingDetails = await bookingCollection.findOne({ carId });
    const carDetails = await carCollection.findOne({ _id: carId });

    if (!bookingDetails || !carDetails) {
      return res.status(404).json({
        success: false,
        message: "No booking or car details found for the provided carId",
      });
    }

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
