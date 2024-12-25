import connectToDatabase from './database.js'; // Import the database connection function
import express from 'express';


const router = express.Router();

router.post('/displaydata', async (req, res) => {
  try {
    // Fetch data from the database
    const cars = await connectToDatabase();
    const New_cars_Collection=cars.collection('New_cars');
    // const New_cars_Collection = client.db("scm").collection("New_cars");
    const New_cars = await New_cars_Collection.find({}).toArray();

    const Used_cars_Collection=cars.collection('Used_cars');

    const Used_cars = await Used_cars_Collection.find({}).toArray();

   

    if (!New_cars.length) {
      return res.status(404).json({
        success: false,
        message: 'Car data not found',
      });
    }else{
      console.log(New_cars);
      res.status(200).json({success: true, new_cars : New_cars , used_cars: Used_cars});
    }

    
  } catch (error) {
    console.error('Error retrieving car data:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;

