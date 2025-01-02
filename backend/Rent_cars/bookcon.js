import express from "express";
import { ObjectId } from "mongodb";
import connectToDatabase from "../database.js";

const router = express.Router();

router.get("/admin_booking", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_car");

    const bookings = await bookCarCollection.find().toArray();

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

// Update booking status
router.put("/admin_booking/:id", async (req, res) => {
  const bookingId = req.params.id; // Booking ID from the URL
  const { status } = req.body; // New status from the request body

  try {
    const db = await connectToDatabase();
    const bookCarCollection = db.collection("Book_car"); // Ensure collection name is correct

    // Ensure the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format.",
      });
    }

    // Fetch the booking to check its current status
    const booking = await bookCarCollection.findOne({
      _id: new ObjectId(bookingId),
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    // Ensure the status provided is valid
    const validStatuses = ["approved", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'cancelled'.",
      });
    }

    // Check if the booking is in 'pending' status
    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Booking status is not 'pending'. It cannot be updated.",
      });
    }

    // Update the booking's status to the new status (approved/cancelled)
    const result = await bookCarCollection.updateOne(
      { _id: new ObjectId(bookingId) }, // Match the booking by its `_id`
      { $set: { status } } // Update the `status` field
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: `Booking status updated to '${status}'.`,
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
