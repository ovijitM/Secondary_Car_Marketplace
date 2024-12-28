import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

function Slip() {
  const location = useLocation();
  console.log("Location State:", location.state);
  const { car, user } = location.state || {}; // Retrieve full car and user objects from state

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!car || !user) {
      setErrorMessage("Invalid data received. Please try again.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [car, user]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{errorMessage}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="text-center my-4">Booking Slip</h1>

      {/* Car Details Section */}
      {car && (
        <Card className="mb-4">
          <Card.Body>
            <h2>Car Details</h2>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Brand:</strong> {car.brand}
                </p>
                <p>
                  <strong>Model:</strong> {car.model}
                </p>
                <p>
                  <strong>Year:</strong> {car.year}
                </p>
                <p>
                  <strong>Color:</strong> {car.color}
                </p>
              </Col>
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={car.img}
                  alt={`${car.brand} ${car.model}`}
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Booking Details Section */}
      {user && (
        <Card>
          <Card.Body>
            <h2>Booking Details</h2>
            <p>
              <strong>Name:</strong> {`${user.firstName} ${user.lastName}`}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.number}
            </p>
            <p>
              <strong>Pick Up:</strong> {user.PickUp}
            </p>
            <p>
              <strong>Destination:</strong> {user.Where_to_go}
            </p>
            {/* Assuming `car.price` is available and passed */}
            <p>price will print here</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Slip;

// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

// function Slip() {
//   const location = useLocation();
//   const { car, user } = location.state || {}; // Retrieve car and user objects from state

//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [price, setPrice] = useState(null);

//   useEffect(() => {
//     if (!car || !user) {
//       setErrorMessage("Invalid data received. Please try again.");
//       setLoading(false);
//     } else {
//       // Send a POST request to the backend to get the booking details and price
//       fetch("http://localhost:8000/api/book", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ car, user }), // Send car and user data
//       })
//         .then((response) => response.json()) // Parse the JSON response
//         .then((data) => {
//           if (data.success) {
//             setPrice(data.data.price); // Set the price received from the backend
//             setLoading(false);
//           } else {
//             setErrorMessage(data.message); // Set error message if not successful
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           setErrorMessage("Error fetching booking details. Please try again.");
//           setLoading(false);
//         });
//     }
//   }, [car, user]);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (errorMessage) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center vh-100">
//         <Alert variant="danger">{errorMessage}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <h1 className="text-center my-4">Booking Slip</h1>

//       {/* Car Details Section */}
//       {car && (
//         <Card className="mb-4">
//           <Card.Body>
//             <h2>Car Details</h2>
//             <Row>
//               <Col md={6}>
//                 <p>
//                   <strong>Brand:</strong> {car.brand}
//                 </p>
//                 <p>
//                   <strong>Model:</strong> {car.model}
//                 </p>
//                 <p>
//                   <strong>Year:</strong> {car.year}
//                 </p>
//                 <p>
//                   <strong>Color:</strong> {car.color}
//                 </p>
//               </Col>
//               <Col md={6}>
//                 <Card.Img
//                   variant="top"
//                   src={car.img}
//                   alt={`${car.brand} ${car.model}`}
//                   className="img-fluid"
//                 />
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Booking Details Section */}
//       {user && (
//         <Card>
//           <Card.Body>
//             <h2>Booking Details</h2>
//             <p>
//               <strong>Name:</strong> {`${user.firstName} ${user.lastName}`}
//             </p>
//             <p>
//               <strong>Phone Number:</strong> {user.number}
//             </p>
//             <p>
//               <strong>Pick Up:</strong> {user.PickUp}
//             </p>
//             <p>
//               <strong>Destination:</strong> {user.Where_to_go}
//             </p>
//             <p>
//               <strong>Price:</strong> ${price !== null ? price : "Loading..."}
//             </p>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// }

// export default Slip;
