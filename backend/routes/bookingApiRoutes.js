import express from 'express';
import nodemailer from 'nodemailer';
import Booking from '../dataModels/BookingModel.js';

const router = express.Router();

// POST route for creating a booking
router.post('/', async (req, res) => {
  const { name, email, phone, date, carBrand, carModel, carNumber, services, notes } = req.body;

  try {
    // 1. Save booking to the database
    const newBooking = new Booking({
      name,
      email,
      phone,
      date,
      carBrand,
      carModel,
      carNumber,
      services,
      notes,
    });

    await newBooking.save();

    // 2. Send confirmation email using NodeMailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your email password
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com', // Sender address
      to: email, // User's email address
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for booking with us! Here are the details of your booking:</p>
        <ul>
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Car Brand:</strong> ${carBrand}</li>
          <li><strong>Car Model:</strong> ${carModel}</li>
          <li><strong>Car Number:</strong> ${carNumber}</li>
          <li><strong>Services:</strong> ${services.join(', ')}</li>
          <li><strong>Notes:</strong> ${notes || 'No additional notes'}</li>
        </ul>
        <p>We look forward to serving you!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 3. Respond to the client
    res.status(201).json({ message: 'Booking successful! Confirmation email sent.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create booking and send email.' });
  }
});

export default router;
