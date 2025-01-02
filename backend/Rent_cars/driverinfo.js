import express from "express";
import { ObjectId } from "mongodb"; // To handle MongoDB ObjectId
import connectToDatabase from "../database.js"; // Ensure this path is correct

const router = express.Router();

// Fetch all drivers
router.get("/dri", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const driverCollection = db.collection("Driver"); // Ensure collection name is correct

    // Fetch all drivers
    const drivers = await driverCollection.find().toArray();

    res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    console.error("Error fetching drivers from database:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching drivers.",
    });
  }
});

// Update driver status
router.put("/dri/:id", async (req, res) => {
  const driverId = req.params.id; // Driver ID from the URL
  const { status } = req.body; // New status from the request body

  try {
    const db = await connectToDatabase();
    const driverCollection = db.collection("Driver"); // Ensure collection name is correct

    // Ensure the ID is a valid MongoDB ObjectId
    if (!ObjectId.isValid(driverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid driver ID format.",
      });
    }

    // Fetch the driver to check its current status
    const driver = await driverCollection.findOne({
      _id: new ObjectId(driverId),
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    // Update the driver status
    const result = await driverCollection.updateOne(
      { _id: new ObjectId(driverId) },
      { $set: { status } }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: `Driver status updated successfully.`,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Driver status unchanged.",
      });
    }
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the driver status.",
    });
  }
});

export default router;
