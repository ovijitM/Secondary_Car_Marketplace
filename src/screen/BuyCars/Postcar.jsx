import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import "./Postcar.css";

export default function Postcar() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: null,
    mileage: "",
    color: "",
    price: null,
    description: "",
    image: null,
    transmission: "", // Added transmission
    usedyear: "", // Added usedyear
    name: "",
    phone: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formDataToSend = new FormData();
      formDataToSend.append("brand", formData.make);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("mileage", formData.mileage);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("transmission", formData.transmission);
      formDataToSend.append("usedyear", formData.usedyear);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("img", formData.image); // Add image file to form data

      try {
        // Sending form data to backend API
        const response = await fetch("http://your-backend-url.com/post", {
          method: "POST",
          body: formDataToSend,
        });

        const result = await response.json();

        if (response.ok) {
          alert("Car posted successfully!");
        } else {
          setErrorMessage(result.message || "Error posting car.");
        }
      } catch (error) {
        setErrorMessage("Error posting car. Please try again.");
        console.error(error);
      }
    }

    setValidated(true);
  };

  return (
    <><div>
      <CustomNavbar /></div>
      <Container className="d-flex justify-content-center align-items-center vh-100 mt-5 mb-5">
        <Card className="shadow-lg p-4" style={{ maxWidth: "800px", width: "100%" }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Post a Car</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* Car Information */}
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationMake">
                  <Form.Label>Brand</Form.Label>
                  <Form.Select
                    required
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                  >
                    <option value="">Select Brand</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Honda">Honda</option>
                    <option value="Ford">Ford</option>
                    <option value="BMW">Nissan</option>
                    <option value="Audi">Audi</option>
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Other car details */}
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationMileage">
                  <Form.Label>Mileage</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationColor">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              {/* Transmission */}
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationTransmission">
                  <Form.Label>Transmission</Form.Label>
                  <Form.Select
                    required
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationUsedYear">
                  <Form.Label>Used for</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="e.g., 2 years"
                    name="usedyear"
                    value={formData.usedyear}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              {/* Description */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter a brief description"
                  />
                </Form.Group>
              </Row>

              {/* Image Upload */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationImage">
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>
              </Row>

              {/* Contact Information */}
              <h3 className="text-center mt-4">Contact Information</h3>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationEmail">
                  <Form.Label>Email Address</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Row>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Post Car
                </Button>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
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
