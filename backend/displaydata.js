import connectToDatabase from './database.js'; // Import the database connection function
import express from 'express';



const router = express.Router();

router.post('/displaydata', async (req, res) => {
  
  try {
  
    const cars = await connectToDatabase();
    const New_cars_Collection=cars.collection('New_cars');
  
    const New_cars = await New_cars_Collection.find({}).toArray();

    const Used_cars_Collection=cars.collection('Used_cars');

    const Used_cars = await Used_cars_Collection.find({}).toArray();

    
    const Rent_Cars_Collection=cars.collection('Rent_Cars');

    const Rent_Cars = await Rent_Cars_Collection.find({}).toArray();

    const Repair_Collection=cars.collection('Parts');

    const Repair= await Repair_Collection.find({}).toArray();

    if (!New_cars.length) {
      return res.status(404).json({
        success: false,
        message: 'Car data not found',
      });
    }else{

      res.status(200).json({success: true, new_cars : New_cars , used_cars: Used_cars, rent_cars: Rent_Cars, repair: Repair});
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

