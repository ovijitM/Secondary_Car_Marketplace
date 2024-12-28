import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

function TransactionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the car data from the location's state
  const car = location.state?.car;

  if (!car) {
    console.log("Car not found in location state");
    return (
      <Container className="text-center my-4">
        <h2>Error</h2>
        <p>No car details available.</p>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const handleConfirmBooking = () => {
    const name = document.getElementById("formName").value;
    const email = document.getElementById("formEmail").value;
    const phone = document.getElementById("formPhone").value;
    const paymentMethod = document.getElementById("formPaymentMethod").value;

    if (!name || !email || !phone || !paymentMethod) {
      alert("Please fill out all fields before confirming.");
      return;
    }

    const userDetails = { name, email, phone };

    console.log("Booking confirmed for:", car, userDetails, paymentMethod);

    navigate("/reciept", {
      state: { car, userDetails, paymentMethod },
    });
  };

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <h2 className="text-center mb-4">Transaction Page</h2>
        <Row>
          {/* Car Details Section */}
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                style={{ objectFit: "cover", height: "300px" }}
              />
              <Card.Body>
                <Card.Title>
                  {car.brand} {car.model}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Model Year: {car.year}
                </Card.Subtitle>
                <Card.Text>Price: ${car.price}</Card.Text>
                <Card.Text>Condition: {car.label}</Card.Text>
                <Card.Text>Location: {car.purchase_location}</Card.Text>
                <Card.Text>Mileage: {car.mileage}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Transaction Form Section */}
          <Col md={6}>
            <Card>
              <Card.Body>
                <h4>Confirm Your Details</h4>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPaymentMethod">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select required>
                      <option value="">Select a payment method</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank-transfer">Bank Transfer</option>
                    </Form.Select>
                  </Form.Group>
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleConfirmBooking} // Ensure this calls the updated function
                  >
                    Confirm Booking
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </Container>
    </>
  );
}

export default TransactionPage;
