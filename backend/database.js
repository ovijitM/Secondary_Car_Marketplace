// console.log('Check')

import { MongoClient } from "mongodb";

// console.log('Check1')

const url =
  "mongodb+srv://scm:123456scm@scm.ez2lk.mongodb.net/scm?retryWrites=true&w=majority&appName=scm";
// console.log('Check2')
export default async function connectToDatabase() {
  // console.log("Check3");
  const client = new MongoClient(url);

  try {
    // console.log("Check4")
    await client.connect();
    console.log("Connected to the database");




    // Load new car items
    // const New_cars_Collection = client.db("scm").collection("New_cars");
    // const New_cars = await New_cars_Collection.find({}).toArray();

//     // Load used car items
//     const Used_cars_Collection = client.db("scm").collection("Used_cars");
//     const Used_cars = await Used_cars_Collection.find({}).toArray();


//     // Load Book_car items
//     const Book_car_Collection = client.db("scm").collection("Book_car");
//     const Book_car = await Book_car_Collection.find({}).toArray();

//     // Load Parts items
//     const Parts_Collection = client.db("scm").collection("Parts");
//     const Parts = await Parts_Collection.find({}).toArray();

//     // Load Rent_Cars items
//     const Driver_Collection = client.db("scm").collection("Driver");
//     const Driver = await Driver_Collection.find({}).toArray();

// // Load Rent_Cars items
//     const Rent_Cars_Collection = client.db("scm").collection("Rent_Cars");
//     const Rent_Cars = await Rent_Cars_Collection.find({}).toArray();

// // Load User_history items
//     const User_history_Collection = client.db("scm").collection("User_history");
//     const User_history = await User_history_Collection.find({}).toArray();

// // Load Users items
//     const Users_Collection = client.db("scm").collection("Users");
//     const Users = await Users_Collection.find({}).toArray();

    console.log("Data loaded successfully");

    // console.log(New_cars);
    // console.log(Used_cars);

    // Return the fetched data as an object
    return client.db("scm");

    
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
