import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

// Endpoint to fetch all data from the Rent_cars table
router.get("/rent-cars", async (req, res) => {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // SQL query to fetch all data from the Rent_cars table
    const query = "SELECT * FROM Rent_Cars";

    // Execute the query
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching data from Rent_cars table:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      // Send the results as a JSON response
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
