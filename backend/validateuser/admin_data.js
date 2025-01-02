import express from "express";
import connectToDatabase from "../database.js";

const router = express.Router();

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: Token is missing" });
    }

    try {
        const decoded = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Token decoding error:", error);
        return res.status(403).json({ success: false, message: "Forbidden: Invalid token" });
    }
};

router.get("/admin", authenticateToken, async (req, res) => {
    try {
        const db = await connectToDatabase();

        const userCollection = db.collection("Users");
        const users = await userCollection.find({ role: "user" }).toArray();
        console.log(users.length);
        console.log('hi');

       
        const newCarCollection = db.collection("New_cars");
        const newCars = await newCarCollection.find({}).toArray();

       
        const usedCarCollection = db.collection("Used_cars");
        const usedCars = await usedCarCollection.find({}).toArray();
       

        
        const totalCar = newCars.length + usedCars.length;

        
        const totalRevenue = newCars.reduce((acc, car) => acc + (car.revenue || 0), 0) +
                             usedCars.reduce((acc, car) => acc + (car.revenue || 0), 0);

      
        const kycCollection = db.collection("KYCApplications"); 
        const kycApplications = await kycCollection.find({}).toArray();
        const totalKYC = kycApplications.length;

        res.status(200).json({
            success: true,
            users,
            totalCar,
            totalRevenue, 
            totalKYC, 
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;