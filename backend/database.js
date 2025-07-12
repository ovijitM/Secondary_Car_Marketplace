import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const url = process.env.MONGODB_URI || "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm";

export default async function connectToDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database");
    console.log("Data loaded successfully");
    return client.db("scm");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}


