import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RentCars.css"; // Optional CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const RentCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

      if (data.success) {
        setCars(data.data);
      } else {
        setErrorMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorMessage("Error fetching cars. Please try again later.");
    }
  };

  // Handle "Book Now" button click
  const handleViewDetails = (car) => {
    console.log("Navigating to book page with car details:", car);
    // Navigate to the /book page and pass the full car details as state
    navigate("/book", { state: { car } });
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
                  onClick={() => handleViewDetails(car)} // Pass the full car object
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
