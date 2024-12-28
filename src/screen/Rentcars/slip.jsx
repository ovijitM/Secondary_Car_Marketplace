import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

function Slip() {
  const location = useLocation();
  const { carId, number } = location.state || {}; // Retrieve carId and number from state

  const [carDetails, setCarDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (carId && number) {
      fetchDetails();
    } else {
      setErrorMessage("Invalid data received. Please try again.");
      setLoading(false);
    }
  }, [carId, number]);

  const fetchDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/slip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId, number }),
      });

      const data = await response.json();
      if (data.success) {
        setCarDetails(data.carDetails); // Data from Rent_cars
        setBookingDetails(data.bookingDetails); // Data from Book_car
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to fetch data.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">Booking Slip</h1>

      {/* Car Details Section */}
      {carDetails && (
        <Card className="mb-4">
          <Card.Body>
            <h2>Car Details</h2>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Brand:</strong> {carDetails.brand}
                </p>
                <p>
                  <strong>Model:</strong> {carDetails.model}
                </p>
                <p>
                  <strong>Year:</strong> {carDetails.year}
                </p>
                <p>
                  <strong>Color:</strong> {carDetails.color}
                </p>
              </Col>
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={carDetails.img}
                  alt={`${carDetails.brand} ${carDetails.model}`}
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Booking Details Section */}
      {bookingDetails && (
        <Card>
          <Card.Body>
            <h2>Booking Details</h2>
            <p>
              <strong>Name:</strong> {bookingDetails.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {bookingDetails.number}
            </p>
            <p>
              <strong>Pick Up:</strong> {bookingDetails.PickUp}
            </p>
            <p>
              <strong>Destination:</strong> {bookingDetails.Where_to_go}
            </p>
            <p>
              <strong>Price:</strong> ${bookingDetails.price}
            </p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Slip;
