import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Cards() {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
          alt="Red Alfa Romeo car on road near trees"
        />
        <Card.Body>
          <Row>
            <Col xs={7}>
              <Card.Title>...</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Model Name
              </Card.Subtitle>
            </Col>
            <Col xs={4} className="text-right">
              <div
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                Label
              </div>
              <div style={{ marginTop: "5px", color: "gray" }}>Year</div>
            </Col>
          </Row>
          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <h5>Price</h5>
          </div>
          <Card.Text>
            A short detail about the car goes here. This can include features,
            specifications, or any other relevant information.
          </Card.Text>
          <Button variant="primary">Buy Now</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;

