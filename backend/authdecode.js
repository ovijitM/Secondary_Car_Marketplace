import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

// Secret key used for signing the JWT (should be stored securely, not hard-coded)
const SECRET_KEY = 'your-secret-key'; 

// Middleware to verify and decode the token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming token is sent as Bearer token

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token is missing' });
  }

  // Verify and decode the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token is invalid' });
    }
    
    // Attach the decoded user information to the request object for later use
    req.user = decoded;  // This decoded object can contain user info like ID, email, etc.

    next(); // Proceed to the next middleware or route handler
  });
};

// Sample route where token is verified and decoded
router.get('/profile', verifyToken, (req, res) => {
  // Access the decoded user info from req.user
  res.json({
    success: true,
    userInfo: req.user, // Send decoded user data
  });
});

export default router;