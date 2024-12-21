import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar';



function RepairPage() {


return (
  <Container>
	<CustomNavbar />
	<Row>
	  <Col>
		<Card>
		  <Card.Body>
			<Card.Title>Repair Page</Card.Title>
			<Button variant="primary">Click Me</Button>
		  </Card.Body>
		</Card>
	  </Col>
	</Row>
  </Container>
);

}