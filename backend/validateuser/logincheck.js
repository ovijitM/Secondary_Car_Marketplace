import express from 'express';
import connectToDatabase from "../database.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");
        const existingUser = await collection.findOne({ email, password });

        if (!existingUser) {
            return res.status(400).json({ success: false, message: 'Email or password is wrong' });
        }
        res.status(200).json({ success: true, message: 'User found' });
    } catch {
        console.log("user info not received");
    }
});

export default router;
