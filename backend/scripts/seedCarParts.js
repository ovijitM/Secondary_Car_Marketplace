import mongoose from 'mongoose';
import Part from '../dataModels/partdata.js'; // Adjusted path based on your project structure

// Define the car parts data
const parts = [
  { name: 'Brake Pads', image: '/assets/repair/images2.jpeg', price: 50 },
  { name: 'Headlights', image: '/assets/repair/headlights.jpg', price: 100 },
  { name: 'Car Battery', image: '/assets/repair/car_battery.jpg', price: 120 },
  { name: 'Windshield Wipers', image: '/assets/repair/windshield_wipers.jpg', price: 30 },
  { name: 'Air Filters', image: '/assets/repair/air_filters.jpg', price: 25 },
  { name: 'Alternator', image: '/assets/repair/alternator.jpg', price: 200 },
  { name: 'Spark Plugs', image: '/assets/repair/spark_plugs.jpg', price: 40 },
  { name: 'New Brake Discs', image: '/assets/repair/images4.jpeg', price: 150 },

];

// Connect to MongoDB using your existing `db.js`
import dbConnect from '../config/db.js'; // Adjust the path if necessary

// Seed the car parts into the database
const seedCarParts = async () => {
  try {
    // Establish database connection
    await dbConnect();
    console.log('Connected to MongoDB for seeding...');

    // Delete all existing parts
    await Part.deleteMany();
    console.log('Existing car parts deleted.');

    // Insert the new parts data
    await Part.insertMany(parts);
    console.log('Car parts seeded successfully!');

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error while seeding car parts:', error);
    mongoose.connection.close(); // Ensure connection is closed even on error
  }
};

// Execute the seed function
seedCarParts();
