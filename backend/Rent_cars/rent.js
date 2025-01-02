import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

// Endpoint to fetch all data from the Rent_cars table and assign a random driver with status true
router.post("/rentCar", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const rent_collection = db.collection("Rent_Cars");
    const driver_collection = db.collection("Driver"); // Assuming a "Drivers" collection exists

    const rent_car = await rent_collection.find({}).toArray();
    const drivers = await driver_collection.find({ status: true }).toArray(); // Get only active drivers (status: true)

    if (rent_car.length > 0 && drivers.length > 0) {
      // Randomly select a driver from the active driver list
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

      // Update the driver's status to false after assignment
      await driver_collection.updateOne(
        { _id: randomDriver._id },
        { $set: { status: false } } // Set status to false (driver is now assigned)
      );

      // Add driver to each car object in the response
      const carsWithDriver = rent_car.map((car) => ({
        ...car,
        driver: randomDriver, // Attach the driver info to each car
      }));

      res.status(200).json({
        success: true,
        data: carsWithDriver,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No cars or active drivers found.",
      });
    }
  } catch (error) {
    console.error("Error fetching cars and drivers:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching cars and drivers.",
    });
  }
});

export default router;
