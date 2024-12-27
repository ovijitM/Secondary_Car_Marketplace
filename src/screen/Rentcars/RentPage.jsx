import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./RentCars.css"; // Optional CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { set } from "mongoose";

const RentCars = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [carId, setCarId] = useState("");
  // Fetch cars from the API
  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rentCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const cars = data.data;

      if (data.success) {
        setCars(data.data);
        setCarId(cars[1]._id);
      } else {
        setErrorMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorMessage("Error fetching cars. Please try again later.");
    }
  };
  const handleViewDetails = (car) => {
    console.log("hi");
    // Navigate to the /book page and pass the carId as state
    navigate("/book", { state: { car } });
    console.log(carId);
  };
  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container className="rent-cars-container">
      <h1>Available Rental Cars</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Row className="cars-grid">
        {cars.map((car) => (
          <Col key={car._id} md={4} className="mb-4">
            <Card className="car-card">
              <Card.Img
                variant="top"
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
              />
              <Card.Body>
                <Card.Title>{`${car.brand} ${car.model} (${car.year})`}</Card.Title>
                <Card.Text>
                  <strong>Rent Price:</strong> ${car.price}
                  <br />
                  <strong>Color:</strong> {car.color}
                  <br />
                  <strong>Details:</strong> {car.details}
                  <br />
                  <strong>Seat Number:</strong> {car.sit}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(car)} // Pass car._id
                >
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RentCars;
