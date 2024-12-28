// 
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar/Customnavbar';

function CarDetails() {
  const handleViewDetails = (car) => {
    navigate("/transaction", { state: { car } });
  };
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the car data from the location's state
  const car = location.state?.car;

  if (!car) {
    console.log("Car not found in location state");
  }

  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <Card>
          <Row className="g-8">
            {/* Left column for the car image */}
            <Col md={5}>
              <Card.Img
                variant="top"
                src={car.img}
                alt={`${car.brand} ${car.model}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Col>
            {/* Right column for the car details */}
            <Col md={7}>
              <Card.Body>
                <Card.Title>{car.brand} {car.model}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Model Year: {car.year}</Card.Subtitle>
                <Card.Text>Details: {car.details}</Card.Text>
                <Card.Text>Label: {car.label}</Card.Text>
                <Card.Text>Price: ${car.price}</Card.Text>
                <Card.Text>Condition: {car.label}</Card.Text>
                <Card.Text>Location: {car.purchase_location}</Card.Text>
                <Card.Text>Transmission: {car.transmission}</Card.Text>
                <Card.Text>Engine: {car.engine}</Card.Text>
                <Card.Text>Color: {car.color}</Card.Text>
                <Card.Text>Body Type: {car.body_type}</Card.Text>
                <Card.Text>Drive Type: {car.drive_type}</Card.Text>
                <Card.Text>Interior: {car.interior}</Card.Text>
                <Card.Text>Exterior: {car.exterior}</Card.Text>
                <Card.Text>Mileage: {car.mileage}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        {/* Buttons section */}
        <div className="d-flex justify-content-center mt-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
            
          <Button
            onClick={() => handleViewDetails(car)}
            variant="primary"
            style={{ marginLeft: "10px" }}
          >
            Proceed To Book
          </Button>
        </div>
      </Container>
    </>
  );
}

export default CarDetails;
