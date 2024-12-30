import express from "express";
const router = express.Router();
import connectToDatabase from "../database.js"; // Ensure your database connection module is properly configured

router.post("/assignDriver", async (req, res) => {
  let db = null;
  try {
    db = await connectToDatabase(); // Connect to the database
    const driverCollection = db.collection("Driver");

    // Find available drivers with status: true
    const availableDrivers = await driverCollection
      .find({ status: true })
      .toArray();
    if (availableDrivers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No drivers available." });
    }

    // Randomly select a driver
    const assignedDriver =
      availableDrivers[Math.floor(Math.random() * availableDrivers.length)];

    // Update the driver's status to false
    await driverCollection.updateOne(
      { _id: assignedDriver._id },
      { $set: { status: false } }
    );

    // Return the assigned driver details
    res.json({ success: true, driver: assignedDriver });
  } catch (error) {
    console.error("Error assigning driver:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});

export default router;
