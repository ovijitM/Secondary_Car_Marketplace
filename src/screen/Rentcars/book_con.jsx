import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch bookings from the API
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin_booking", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched data from API:", data); // Log the response for debugging

      if (data.success) {
        setBookings(data.data); // Set the bookings
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setErrorMessage(
        "An error occurred while fetching bookings. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle status update for a booking
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin_booking/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchBookings(); // Refresh bookings after status update
      } else {
        setErrorMessage(data.message || "Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
      setErrorMessage("An error occurred while updating the booking status.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container className="admin-panel-container">
      <Row className="align-items-center mb-4">
        <h2>Admin Panel - Manage Bookings</h2>
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
          {bookings.map((booking) => (
            <Col key={booking._id} md={4} className="mb-4">
              <Card className="car-card h-100">
                <Card.Img
                  variant="top"
                  src={booking.carImg} // Image URL from the database
                  alt={`${booking.carBrand} ${booking.carModel}`}
                  className="car-image"
                />
                <Card.Body>
                  <Card.Title>
                    {`${booking.carBrand} ${booking.carModel} (${booking.carYear})`}
                  </Card.Title>
                  <Card.Text>
                    <strong>Pick-Up:</strong> {booking.PickUp}
                    <br />
                    <strong>Destination:</strong> {booking.Where_to_go}
                    <br />
                    <strong>Price:</strong> {booking.price} TK
                    <br />
                    <strong>Seats:</strong> {booking.carSit}
                    <br />
                    <strong>User Name:</strong> {booking.name}
                    <br />
                    <strong>User Phone:</strong> {booking.number}
                  </Card.Text>

                  <div className="d-flex justify-content-between">
                    {booking.status === "pending" ? (
                      <>
                        <Button
                          variant="success"
                          onClick={() =>
                            handleStatusUpdate(booking._id, "confirmed")
                          }
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleStatusUpdate(booking._id, "rejected")
                          }
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span>Status: {booking.status}</span>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminPanel;
