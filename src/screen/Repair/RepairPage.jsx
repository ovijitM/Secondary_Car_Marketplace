import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar';
const repairServices = [
  { id: 1, name: 'Engine Repair', description: 'Fix engine issues such as overheating, oil leaks, or misfiring.', price: 300, available: true },
  { id: 2, name: 'Tire Replacement', description: 'Replace worn-out or damaged tires with new ones.', price: 100, available: true },
  { id: 3, name: 'Brake Replacement', description: 'Change brake pads or repair brake systems to ensure safety.', price: 150, available: false },
  { id: 4, name: 'Oil Change', description: 'Change the oil to keep the engine running smoothly.', price: 50, available: true },
  { id: 5, name: 'Battery Replacement', description: 'Replace old batteries with new ones to ensure reliable starts.', price: 120, available: true },
];

function RepairPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [serviceDetails, setServiceDetails] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Handle selecting a service
  const handleSelectService = (service) => {
    setSelectedService(service);
    setServiceDetails(service.description);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);


  const handleRequestRepair = () => {
    alert(`You have requested the ${selectedService.name} service.`);
    setShowModal(false);
  };

  return (
    <>
      <CustomNavbar /> 
      <Container className="my-4">
        <h2 className="text-center mb-4">Repair Services</h2>

        <Row>
          {repairServices.map((service) => (
            <Col key={service.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Card.Text>
                    <strong>Price: </strong>${service.price}
                  </Card.Text>
                  {service.available ? (
                    <Button variant="primary" onClick={() => handleSelectService(service)}>
                      Request Repair
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

      {/* Modal for service details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request {selectedService?.name} Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Service Details</h5>
          <p><strong>Name:</strong> {selectedService?.name}</p>
          <p><strong>Description:</strong> {serviceDetails}</p>
          <p><strong>Price:</strong> ${selectedService?.price}</p>

          <Form.Group controlId="quantity">
            <Form.Label>Quantity (Optional):</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <hr />
          <p><strong>Total Cost: </strong>${selectedService?.price * quantity}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRequestRepair}>
            Confirm Repair Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RepairPage;
