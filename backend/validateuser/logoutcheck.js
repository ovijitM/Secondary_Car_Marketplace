import express from 'express';
import connectToDatabase from "../database.js";

const router = express.Router();

router.post('/logout', async (req, res) => {
    const { email } = req.body; 

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");

        await collection.updateOne(
            { email }, 
            { $set: { token: 0 } }
        );
        const user = await collection.findOne({email,token}).toArray();

        res.status(200).json({ success: true, message: 'User  logged out successfully' , token : user.token});
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;