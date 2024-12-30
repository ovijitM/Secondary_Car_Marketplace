import mongoose from 'mongoose';
import Service from '../dataModels/servicedata.js'; // Adjust the path if necessary
import db from '../config/db.js'; // Database connection

// Connect to the database
db();

const seedServices = async () => {
  const newServices = [
    { name: 'New Service 1', price: 99.99, description: 'Description for new service 1.' },
    { name: 'New Service 2', price: 89.99, description: 'Description for new service 2.' }
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
