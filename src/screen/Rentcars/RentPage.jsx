import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar';

const carsForRent = [
  { id: 1, brand: 'Tesla', model: 'Model S', year: 2023, pricePerDay: 150, available: true, image: 'path/to/tesla.jpg' },
  { id: 2, brand: 'Ford', model: 'Mustang GT', year: 2021, pricePerDay: 120, available: true, image: 'path/to/ford.jpg' },
  { id: 3, brand: 'Chevrolet', model: 'Camaro ZL1', year: 2022, pricePerDay: 130, available: false, image: 'path/to/chevy.jpg' },
  { id: 4, brand: 'BMW', model: 'M3', year: 2020, pricePerDay: 140, available: true, image: 'path/to/bmw.jpg' },
  { id: 5, brand: 'Audi', model: 'A6', year: 2021, pricePerDay: 110, available: true, image: 'path/to/audi.jpg' },
];

function RentPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);


  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };


  const handleCloseModal = () => setShowModal(false);


  const handleRentCar = () => {
    alert(`You have rented the ${selectedCar.brand} ${selectedCar.model} for ${rentalDays} day(s).`);
    setShowModal(false);
  };

  return (
    <>
      <CustomNavbar /> 

      <Container className="my-4">
        <h2 className="text-center mb-4">Rent a Car</h2>

        <Row>
          {carsForRent.map((car) => (
            <Col key={car.id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={car.image} />
                <Card.Body>
                  <Card.Title>{car.brand} {car.model}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{car.year}</Card.Subtitle>
                  <Card.Text>
                    {car.available ? (
                      <>
                        <strong>Price per day: </strong>${car.pricePerDay}
                      </>
                    ) : (
                      <strong className="text-danger">Currently Unavailable</strong>
                    )}
                  </Card.Text>
                  {car.available ? (
                    <Button variant="primary" onClick={() => handleSelectCar(car)}>
                      Rent Now
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled>
                      Not Available
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rent {selectedCar?.brand} {selectedCar?.model}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Rental Details</h5>
          <p><strong>Brand:</strong> {selectedCar?.brand}</p>
          <p><strong>Model:</strong> {selectedCar?.model}</p>
          <p><strong>Year:</strong> {selectedCar?.year}</p>
          <p><strong>Price per day:</strong> ${selectedCar?.pricePerDay}</p>
          
          <Form.Group controlId="rentalDays">
            <Form.Label>Number of days:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={rentalDays}
              onChange={(e) => setRentalDays(e.target.value)}
            />
          </Form.Group>
          <hr />
          <p><strong>Total Cost: </strong>${selectedCar?.pricePerDay * rentalDays}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRentCar}>
            Rent Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RentPage;
