import express from "express";
import connectToDatabase from "../database.js";

// routes/admin.js
const router = express.Router();

router.get("/admin_booking", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_Car");

    // Fetch all bookings with a status of "active"
    const bookings = await bookCarCollection.find({ isActive: true }).toArray();

    // Log the raw result from MongoDB for debugging
    console.log("Fetched bookings from database:", bookings);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings from database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching bookings.",
    });
  }
});

// Endpoint to update the status of a booking
router.put("/admin_booking/:id", async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_Car");

    // Update the booking's status in the database
    const result = await bookCarCollection.updateOne(
      { _id: bookingId }, // Match the booking by its `_id`
      { $set: { status } } // Update the `status` field
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: `Booking ${bookingId} status updated to ${status}.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Booking not found or status unchanged.",
      });
    }
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the booking status.",
    });
  }
});

export default router;
