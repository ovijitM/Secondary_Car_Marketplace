import express from "express";
import connectToDatabase from "../database.js";
import { ObjectId } from "mongodb";

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

// Route to fetch slip details by carId and user information
router.post("/book", async (req, res) => {
  const { car, user } = req.body; // Receive car and user data from request body

  if (!car || !car.carId) {
    return res.status(400).json({
      success: false,
      message: "Car information and carId are required.",
    });
  }

  if (!user || !user.number || !user.PickUp || !user.Where_to_go) {
    return res.status(400).json({
      success: false,
      message:
        "User information, phone number, PickUp, and Where_to_go are required.",
    });
  }

  const { carId } = car; // Extract carId from car object
  const { number, PickUp, Where_to_go } = user; // Extract user details

  try {
    // Find the matching route based on PickUp and Where_to_go
    const route = distination.find(
      (d) => d.to === PickUp && d.from === Where_to_go
    );

    if (!route) {
      return res.status(400).json({
        success: false,
        message: "Invalid route",
      });
    }

    // Calculate the price (assuming 5 is the rate per distance unit)
    const price = route.distance * 5;
    console.log("Calculated Price:", price);
    // Ensure carId is valid ObjectId
    if (!ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid carId provided.",
      });
    }

    // Connect to the database
    const db = await connectToDatabase();

    // Collections
    const bookingCollection = db.collection("Book_car");
    const carCollection = db.collection("Rent_Cars");

    // Fetch booking and car details in parallel
    const [bookingDetails, carDetails] = await Promise.all([
      bookingCollection.findOne({
        carId: new ObjectId(carId),
        number: number,
      }),
      carCollection.findOne({ _id: new ObjectId(carId) }),
    ]);

    // Check if both booking and car details are found
    if (!bookingDetails || !carDetails) {
      return res.status(404).json({
        success: false,
        message: "Booking or car details not found.",
      });
    }

    // Send success response with both car and booking details, including the calculated price
    return res.status(200).json({
      success: true,
      data: {
        car: carDetails, // Send car details fetched from the Rent_Cars collection
        booking: bookingDetails, // Send booking details fetched from the Book_car collection
        price: price, // Include the calculated price based on distance
      },
    });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});
export default router;
// import express from "express";
// import connectToDatabase from "../database.js";
// import { ObjectId } from "mongodb";

// // Define available destinations
// const distination = [
//   { to: "Dhaka", from: "Khulna", distance: 150 },
//   { to: "Dhaka", from: "Cox Bazar", distance: 300 },
//   { to: "Dhaka", from: "Sylhet", distance: 250 },
//   { to: "Dhaka", from: "Rajshahi", distance: 200 },
//   { to: "Dhaka", from: "Barishal", distance: 180 },
//   { to: "Dhaka", from: "Rangpur", distance: 220 },
//   { to: "Dhaka", from: "Mymensingh", distance: 160 },
//   { to: "Dhaka", from: "Jessore", distance: 170 },
//   { to: "Dhaka", from: "Comilla", distance: 190 },
//   { to: "Dhaka", from: "Narayanganj", distance: 140 },
//   { to: "Dhaka", from: "Bogra", distance: 210 },
//   { to: "Dhaka", from: "Dinajpur", distance: 230 },
//   { to: "Dhaka", from: "Feni", distance: 240 },
//   { to: "a", from: "b", distance: 260 },
// ];

// const router = express.Router();

// router.post("/book", async (req, res) => {
//   const { car, user } = req.body; // Receive car and user data from request body

//   // Check if car information is present
//   if (!car || !car.carId) {
//     return res.status(400).json({
//       success: false,
//       message: "Car information and carId are required.",
//     });
//   }

//   // Check if user information is complete
//   if (!user || !user.number || !user.PickUp || !user.Where_to_go) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "User information, phone number, PickUp, and Where_to_go are required.",
//     });
//   }

//   const { carId } = car; // Extract carId from car object
//   const { number, PickUp, Where_to_go } = user; // Extract user details

//   // Normalize input data to lowercase for consistent comparison
//   const normalizedPickUp = PickUp.trim().toLowerCase();
//   const normalizedWhereToGo = Where_to_go.trim().toLowerCase();

//   console.log("Normalized PickUp:", normalizedPickUp);
//   console.log("Normalized Where_to_go:", normalizedWhereToGo);
//   console.log("Available Destinations:", distination); // Log available routes

//   try {
//     // Find the matching route based on PickUp and Where_to_go
//     const route = distination.find(
//       (d) =>
//         d.to.toLowerCase() === normalizedPickUp &&
//         d.from.toLowerCase() === normalizedWhereToGo
//     );

//     if (!route) {
//       console.log("No matching route found");
//       return res.status(400).json({
//         success: false,
//         message: `Invalid route: No route found from ${Where_to_go} to ${PickUp}. Please check your input.`,
//       });
//     }

//     // Calculate the price (assuming 5 is the rate per distance unit)
//     const price = route.distance * 5;
//     console.log("Calculated Price:", price);

//     // Ensure carId is valid ObjectId
//     if (!ObjectId.isValid(carId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid carId provided.",
//       });
//     }

//     // Connect to the database
//     const db = await connectToDatabase();

//     // Collections
//     const bookingCollection = db.collection("Book_car");
//     const carCollection = db.collection("Rent_Cars");

//     // Fetch booking and car details in parallel
//     const [bookingDetails, carDetails] = await Promise.all([
//       bookingCollection.findOne({
//         carId: new ObjectId(carId),
//         number: number,
//       }),
//       carCollection.findOne({ _id: new ObjectId(carId) }),
//     ]);

//     // Check if both booking and car details are found
//     if (!bookingDetails || !carDetails) {
//       return res.status(404).json({
//         success: false,
//         message: "Booking or car details not found.",
//       });
//     }

//     // Send success response with both car and booking details, including the calculated price
//     return res.status(200).json({
//       success: true,
//       data: {
//         car: carDetails, // Send car details fetched from the Rent_Cars collection
//         booking: bookingDetails, // Send booking details fetched from the Book_car collection
//         price: price, // Include the calculated price based on distance
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching booking details:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error.",
//     });
//   }
// });

// export default router;
