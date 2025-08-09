import express from "express";
import connectToDatabase from "./database.js";

const router = express.Router();

router.post("/repairhistory", async (req, res) => {
  const { name, email, phone, paymentMethod, repair } = req.body;

  if (!name || !email || !phone || !paymentMethod || !repair) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Reference the 'User_history' collection
    const collection = db.collection("repairhistory");
    const collection2 = db.collection("Transaction_history");

    // Create the document to insert
    const newHistory = {
      name,
      email,
      phone,
      paymentMethod,
      repair,
    
      transactionid: Math.floor(Math.random() * 1000000), // Generate a random transaction ID
      timestamp: new Date(), // Add a timestamp field
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newHistory);
    const result2 = await collection2.insertOne(newHistory);
    
    if (result.acknowledged && result2.acknowledged) {
      return res.status(201).json({ success: true, message: 'Repair history added successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to add repair history' });
    }

    // const Transaction_history_Collection=db.collection('Transaction_history');
    // const Transaction_history = await Transaction_history_Collection.find({}).toArray();
  } catch (error) {
    console.error("Error saving user history:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
