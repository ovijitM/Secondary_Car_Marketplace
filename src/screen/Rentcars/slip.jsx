import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const { carId } = useParams(); // Retrieve carId from the route
  const [details, setDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/slip`);
      const data = await response.json();

      if (data.success) {
        setDetails(data.data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setErrorMessage(
        "Failed to load booking details. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [carId]);

  if (errorMessage) {
    return <div className="alert alert-danger">{errorMessage}</div>;
  }

  if (!details) {
    return <div>Loading...</div>;
  }

  const { booking, car } = details;

  return (
    <div className="container">
      <h1>Booking Details</h1>
      <h2>Customer Details</h2>
      <p>
        <strong>Name:</strong> {booking.name}
      </p>
      <p>
        <strong>Phone Number:</strong> {booking.number}
      </p>
      <p>
        <strong>Pick Up:</strong> {booking.PickUp}
      </p>
      <p>
        <strong>Destination:</strong> {booking.Where_to_go}
      </p>
      <p>
        <strong>Price:</strong> ${booking.price}
      </p>

      <h2>Car Details</h2>
      <p>
        <strong>Brand:</strong> {car.brand}
      </p>
      <p>
        <strong>Model:</strong> {car.model}
      </p>
      <p>
        <strong>Year:</strong> {car.year}
      </p>
      <p>
        <strong>Color:</strong> {car.color}
      </p>
      <p>
        <strong>Rent Price:</strong> ${car.price}
      </p>
    </div>
  );
};

export default BookingDetails;
