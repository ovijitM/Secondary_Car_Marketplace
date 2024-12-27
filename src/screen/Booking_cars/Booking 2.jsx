import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Customnavbar from "../../components/Customnavbar/Customnavbar";
const distination = [
  { to: "dhaka", from: "khulna", distance: 150 },
  { to: "dhaka", from: "cox cazar", distance: 300 },
];

function Signup() {
  const [validated, setValidated] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    number: "",
    PickUp: "",
    Where_to_go: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // Calculate distance and cost
      const route = distination.find(
        (route) =>
          route.from.toLowerCase() === info.PickUp.toLowerCase() &&
          route.to.toLowerCase() === info.Where_to_go.toLowerCase()
      );

      if (route) {
        const cost = route.distance * 5;
        setCalculatedCost(cost);

        // Optionally, make an API call to save the booking
        const response = await fetch("http://localhost:8000/api/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${info.firstName} ${info.lastName}`,
            number: info.number,
            PickUp: info.PickUp,
            Where_to_go: info.Where_to_go,
            cost,
          }),
        });

        const data = await response.json();
        console.log(data);

        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("");
          // Optionally reset the form or redirect the user
          setInfo({
            firstName: "",
            lastName: "",
            number: "",
            PickUp: "",
            Where_to_go: "",
          });
        }
      } else {
        setErrorMessage("No route found for the selected locations.");
        setCalculatedCost(null);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Customnavbar />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card
          className="shadow-lg p-4"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <Card.Body>
            <Card.Title className="text-center mb-4">Booking</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={info.firstName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={info.lastName}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your Phone number"
                      name="number"
                      value={info.number}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid number.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustomPickUp">
                  <Form.Label>Pick Up Location</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Pick Up location"
                    name="PickUp"
                    value={info.PickUp}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationCustomWhereToGo"
                >
                  <Form.Label>Where to Go</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Destination"
                    name="Where_to_go"
                    value={info.Where_to_go}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Confirm Booking
                </Button>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                {calculatedCost && (
                  <div className="alert alert-success" role="alert">
                    Total Cost: ${calculatedCost}
                  </div>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Signup;
