import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./RentCars.css"; // Optional CSS file for styling
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const RentCars = () => {
  const navigate = useNavigate(); // Initialize useNavigate
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
        // Set fetched cars
      } else {
        setErrorMessage(data.message); // Set error message
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorMessage("Error fetching cars. Please try again later.");
    }
  };

  // Handle car booking
  const handleSubmit = async (car) => {
    // console.log("hi"); // Assuming you need the car ID for booking
    const info = {
      carId: car._id,
      // Add other necessary booking details here
    };

    // try {
    //   const response = await fetch("http://localhost:8000/api/book", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(info),
    //   });

    const data = await response.json();

    if (!data.success) {
      // console.log("unsuess");
      // Navigate to book page on success
    } else {
      navigate("/book");
      // setErrorMessage(data.message);
    }
    // } catch (error) {
    //   console.error("Error during booking:", error);
    //   setErrorMessage("Error during booking. Please try again later.");
    // }
  };

  useEffect(() => {
    fetchCars(); // Fetch cars on component mount
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
                <Link to="/book">
                  <Button variant="primary" onClick={() => handleSubmit(car)}>
                    Book Now
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RentCars;
