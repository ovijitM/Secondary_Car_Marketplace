import mongoose from 'mongoose';
import Service from '../dataModels/servicedata.js'; // Adjust the path if necessary
import db from '../config/db.js'; // Database connection

// Connect to the database
db();

const seedServices = async () => {
  const newServices = [
    { name: 'Suspension Check', price: 45.99, description: 'Complete check and adjustment of the suspension system.' },
    { name: 'AC Service', price: 89.99, description: 'Air conditioning refill and filter check.' },
    { name: 'Wheel Alignment', price: 59.99, description: 'Alignment of wheels for optimal driving and tire wear.' }

  ];

  try {
    // Adds new services without deleting existing ones
    await Service.insertMany(newServices, { ordered: false });
    console.log('New services added successfully!');
  } catch (error) {
    console.error('Error adding new services:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from database.');
  }
};

seedServices();
