import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const RentCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to fetch cars.");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      setErrorMessage(
        "An error occurred while fetching cars. Please try again later."
      );
    } finally {
      setLoading(false);
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
    <>
      <CustomNavbar />
      <Container className="rent-cars-container">
        <Row className="align-items-center mb-4">
          <Col>
            <h1>Available Rental Cars</h1>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={() => navigate("/cal")}
              className="calculator-button"
            >
              Open Calculator
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={() => navigate("/admin_booking")}
              className="calculator-button"
            >
              Open admin
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : errorMessage ? (
          <Alert variant="danger">{errorMessage}</Alert>
        ) : (
          <Row className="cars-grid">
            {cars.map((car) => (
              <Col key={car._id} md={4} className="mb-4">
                <Card className="car-card h-100">
                  <Card.Img
                    variant="top"
                    src={car.img}
                    alt={`${car.brand} ${car.model}`}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
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
        )}
      </Container>
    </>
  );
};

export default RentCars;
