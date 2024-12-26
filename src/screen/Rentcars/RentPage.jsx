import React, { useEffect, useState } from "react";
import "./RentCars.css"; // Optional CSS file for styling

import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";

const RentCars = () => {
  const [cars, setCars] = useState([]);
  const [Message, setErrorMessage] = useState("");

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rentCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setCars(data.data);
      } else {
        setErrorMessage(data.message);
      }
    } catch {
      console.log("hey not found");
    }
  };

  const handleBooking = async (carId) => {
    try {
      const response = await fetch("http://localhost:8000/api/bookCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Car booked successfully!");
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (error) {
      alert("Error booking car. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="rent-cars-container">
      <h1>Available Rental Cars</h1>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className="car-image"
            />
            <div className="car-details">
              <h2>{`${car.brand} ${car.model} (${car.year})`}</h2>
              <p>
                <strong>Rent Price:</strong> ${car.price}
              </p>
              <p>
                <strong>Color:</strong> {car.color}
              </p>
              <p>
                <strong>Details:</strong> {car.details}
              </p>
              <p>
                <strong>Seat Number:</strong> {car.sit}
              </p>
              <Button
                variant="primary"
                onClick={() => handleBooking(car._id)}
                className="book-button"
              >
                Book
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentCars;
