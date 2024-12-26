import express from 'express';
import connectToDatabase from "../database.js";

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const collection = db.collection("Users");
        const existingUser  = await collection.findOne({ email });

        if (!existingUser ) {
            return res.status(400).json({ success: false, message: 'Email or password is wrong' });
        }

        if (existingUser .password !== password) {
            return res.status(400).json({ success: false, message: 'Email or password is wrong' });
        }

        await collection.updateOne(
            { email }, 
            { $set: { token: 1 } }
        );

        res.status(200).json({ success: true, message: 'User  found', role: existingUser .role });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;