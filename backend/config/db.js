import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    // Use the connection string from MongoDB Compass
    const uri = "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
