// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function User() {
//   const location = useLocation();
//   const { email, token } = location.state || {}; // Extract email and token from the passed state
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         if (!token) {
//           throw new Error('Authorization token is missing.');
//         }

//         const response = await fetch('http://localhost:8000/api/user', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Failed to fetch user data.');
//         }

//         const data = await response.json();
//         setUserData(data);
//       } catch (err) {
//         setError(err.message || 'An unexpected error occurred.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [token]);

//   return (
//     <div>
//       <h1>User Dashboard</h1>
//       {loading && <p>Loading user data...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {userData && !loading && !error ? (
//         <div>
//           <h2>Welcome, {userData.username}!</h2>
//           <p>Email: {email}</p>
//           <p>Role: {userData.role}</p>
//           <h3>Your Activities</h3>
//           <ul>
//             {userData.activities && userData.activities.length > 0 ? (
//               userData.activities.map((activity, index) => (
//                 <li key={index}>{activity}</li>
//               ))
//             ) : (
//               <li>No activities found.</li>
//             )}
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// }
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from '../../components/Customnavbar/Customnavbar';

function DashboardPage() {
  return (
    <>
      <CustomNavbar />
      <Container className="my-4">
        <h2 className="text-center mb-4">Dashboard</h2>
        <Row>
          {/* Summary Cards */}
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Total Bookings</Card.Title>
                <Card.Text className="fs-2 text-primary">25</Card.Text>
                <Button variant="primary" onClick={() => console.log('View bookings')}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Total Revenue</Card.Title>
                <Card.Text className="fs-2 text-success">$12,450</Card.Text>
                <Button variant="success" onClick={() => console.log('View revenue')}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Cars Available</Card.Title>
                <Card.Text className="fs-2 text-warning">10</Card.Text>
                <Button variant="warning" onClick={() => console.log('View available cars')}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activities Section */}
        <h3 className="mt-4">Recent Activities</h3>
        <Card className="mb-4">
          <Card.Body>
            <ul>
              <li>
                <strong>Booking:</strong> John Doe booked a Tesla Model 3 for $40,000.
              </li>
              <li>
                <strong>Revenue:</strong> Payment received from Jane Smith for a Ford Mustang.
              </li>
              <li>
                <strong>Update:</strong> Added a new car to inventory: Audi Q7.
              </li>
              <li>
                <strong>Notification:</strong> Maintenance scheduled for BMW X5.
              </li>
            </ul>
          </Card.Body>
        </Card>

        {/* Quick Links Section */}
        <h3 className="mt-4">Quick Links</h3>
        <Row>
          <Col md={4} className="mb-4">
            <Button variant="info" className="w-100" onClick={() => console.log('Go to cars')}>
              Manage Cars
            </Button>
          </Col>
          <Col md={4} className="mb-4">
            <Button variant="secondary" className="w-100" onClick={() => console.log('Go to users')}>
              Manage Users
            </Button>
          </Col>
          <Col md={4} className="mb-4">
            <Button variant="dark" className="w-100" onClick={() => console.log('Go to reports')}>
              View Reports
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;
