import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Customnavbar from '../../components/Customnavbar/Customnavbar';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
    setErrorMessage('');
    setSuccessMessage('');

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });






    const data = await response.json();

    if (data.success) {
      localStorage.setItem("authToken", data.authToken); // Save the token in local storage
      console.log(localStorage.getItem("authToken"));
      console.log('token') // Check if the token is saved
      navigate("/"); // Redirect to home page

      setSuccessMessage(data.message);

      if (data.role === 'admin') {
        navigate('/Admin_dashboard', { state: { email: info.email, token: data.token } });
      } else {
        navigate('/User_dashboard', { state: { email: info.email, token: data.token } });
      }
    } else {
      setErrorMessage(data.message);

    }
  };

  return (
    <>
      <Customnavbar />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col md={12}>
            <Card className="shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
              <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={info.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      We&apos;ll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={info.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                  {errorMessage && (
                    <div className="alert alert-danger mt-3" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  {successMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                      {successMessage}
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;