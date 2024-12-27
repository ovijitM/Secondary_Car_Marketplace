import express from "express";
import addUser from "./booking.js";
import connectToDatabase from "../database.js";

const distination = [
  { to: "Dhaka", from: "Khulna", distance: 150 },
  { to: "Dhaka", from: "Cox Bazar", distance: 300 },
  { to: "Dhaka", from: "Sylhet", distance: 250 },
  { to: "Dhaka", from: "Rajshahi", distance: 200 },
  { to: "Dhaka", from: "Barishal", distance: 180 },
  { to: "Dhaka", from: "Rangpur", distance: 220 },
  { to: "Dhaka", from: "Mymensingh", distance: 160 },
  { to: "Dhaka", from: "Jessore", distance: 170 },
  { to: "Dhaka", from: "Comilla", distance: 190 },
  { to: "Dhaka", from: "Narayanganj", distance: 140 },
  { to: "Dhaka", from: "Bogra", distance: 210 },
  { to: "Dhaka", from: "Dinajpur", distance: 230 },
  { to: "Dhaka", from: "Feni", distance: 240 },
  { to: "a", from: "b", distance: 260 },
];

const router = express.Router();

router.post("/book", async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, number, PickUp, Where_to_go, carId } = req.body;

  try {
    // Find the matching route
    const route = distination.find(
      (d) => d.to === PickUp && d.from === Where_to_go
    );

    if (!route) {
      return res.status(400).json({
        success: false,
        message: "Invalid route",
      });
    }

    // Calculate the price
    const price = route.distance * 5;

    if (!carId) {
      return res.status(400).json({
        success: false,
        message: "Car ID is missing.",
      });
    }
    const car = carId;
    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.collection("Book_car");

    // Check if the user already exists
    const existingUser = await collection.findOne({ number });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this phone number already exists",
      });
    }

    const result = await addUser({
      name,
      number,
      PickUp,
      Where_to_go,
      price,
      carId: carId,
    });

    if (result.success) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to add booking",
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;

// import express from "express";
// import addUser from "./booking.js";
// import connectToDatabase from "../database.js";

// // Define the possible routes with distances
// const distination = [
//   { to: "Dhaka", from: "Khulna", distance: 150 },
//   { to: "Dhaka", from: "Cox Bazar", distance: 300 },
// ];

// const router = express.Router();

// router.post("/book", async (req, res) => {
//   const { name, number, PickUp, Where_to_go, carId } = req.body;

//   try {
//     // Find the matching route
//     const route = distination.find(
//       (d) => d.to === PickUp && d.from === Where_to_go
//     );

//     if (!route) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid route",
//       });
//     }

//     // Fetch car details from the database using carId
//     if (!carId) {
//       return res.status(400).json({
//         success: false,
//         message: "Car ID is required",
//       });
//     }

//     // Connect to the database
//     const db = await connectToDatabase();
//     const carsCollection = db.collection("Rent_Cars"); // Assuming the cars collection is named 'Cars'
//     const car = await carsCollection.findOne({ _id: carId });

//     // Ensure the car is found and has necessary attributes
//     if (
//       !car ||
//       !car.brand ||
//       !car.model ||
//       !car.year ||
//       !car.color ||
//       !car.price
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Car not found or missing car details",
//       });
//     }

//     const { brand, model, year, color, price: carPrice } = car;

//     // Calculate the price based on distance
//     const routeDistance = route.distance;
//     const price = carPrice * routeDistance; // Example price calculation

//     // Check if the user already exists
//     const usersCollection = db.collection("Book_car");
//     const existingUser = await usersCollection.findOne({ number });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User with this phone number already exists",
//       });
//     }

//     // Add the booking to the database with all car attributes
//     const result = await addUser({
//       name,
//       number,
//       PickUp,
//       Where_to_go,
//       price,
//       carBrand: brand,
//       carModel: model,
//       carYear: year,
//       carColor: color,
//     });

//     if (result.success) {
//       return res.status(201).json(result);
//     } else {
//       return res.status(500).json({
//         success: false,
//         message: result.message || "Failed to add booking",
//       });
//     }
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });

// export default router;
