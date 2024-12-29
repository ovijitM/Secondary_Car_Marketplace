// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

// function Slip() {
//   const location = useLocation();
//   console.log("Location State:", location.state);
//   const { car, user } = location.state || {}; // Retrieve full car and user objects from state

//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (!car || !user) {
//       setErrorMessage("Invalid data received. Please try again.");
//       setLoading(false);
//     } else {
//       setLoading(false);
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
//  in here PickUp and Where_to_go are the values that are passed from the user data file
//      const [pickup, setPickup] = useState("");
//       const [destination, setDestination] = useState("");
//       const [price, setPrice] = useState(null);
//       const [error, setError] = useState("");

//       const handleSubmit = (e) => {
//         e.preventDefault();
//         setError(""); // Reset error
//         setPrice(null); // Reset price

//         // Normalize inputs to lowercase and trim
//         const normalizedPickup = pickup.trim().toLowerCase();
//         const normalizedDestination = destination.trim().toLowerCase();

//         // Find the matching route
//         const route = destinations.find(
//           (d) =>
//             d.to.toLowerCase() === normalizedPickup &&
//             d.from.toLowerCase() === normalizedDestination
//         );

//         if (!route) {
//           setError(`Invalid route from ${destination} to ${pickup}.`);
//           return;
//         }

//         // Calculate price (5 TK per KM)
//         const calculatedPrice = route.distance * 5;
//         setPrice(calculatedPrice);
//       };
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
//             {/* Assuming `car.price` is available and passed */}
//             <p>price will print here</p>
//           </Card.Body>
//         </Card>
//       )}
//     </Container>
//   );
// }

// export default Slip;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

function Slip() {
  const location = useLocation();
  const { car, user } = location.state || {}; // Retrieve car and user objects from state

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState(null);

  const destinations = [
    { to: "Dhaka", from: "Khulna", distance: 150 },
    { to: "Dhaka", from: "Cox Bazar", distance: 300 },
    { to: "Dhaka", from: "Sylhet", distance: 250 },
    { to: "Dhaka", from: "Rajshahi", distance: 200 },
    { to: "Dhaka", from: "Barishal", distance: 180 },
    { to: "Dhaka", from: "Rangpur", distance: 220 },
    { to: "Dhaka", from: "Mymensingh", distance: 160 },
    { to: "Dhaka", from: "Jessore", distance: 170 },
    { to: "Dhaka", from: "Comilla", distance: 190 },
    { to: "Dhaka", from: "Narayanganj", distance: 140 },
    { to: "Dhaka", from: "Bogra", distance: 210 },
    { to: "Dhaka", from: "Dinajpur", distance: 230 },
    { to: "Dhaka", from: "Feni", distance: 240 },
    { to: "a", from: "b", distance: 260 },
  ];
  useEffect(() => {
    if (!car || !user) {
      setErrorMessage("Invalid data received. Please try again.");
      setLoading(false);
      return;
    }

    const calculatePrice = () => {
      const normalizedPickup = user.PickUp.trim().toLowerCase();
      const normalizedDestination = user.Where_to_go.trim().toLowerCase();

      // Find the matching route
      const route = destinations.find(
        (d) =>
          d.to.toLowerCase() === normalizedPickup &&
          d.from.toLowerCase() === normalizedDestination
      );

      if (!route) {
        setErrorMessage(
          `Invalid route from ${user.PickUp} to ${user.Where_to_go}.`
        );
        setLoading(false);
        return;
      }
      // Calculate price based on car seat number
      const ratePerKm = car.sit > 4 ? 8 : 5;
      const calculatedPrice = route.distance * ratePerKm;
      setPrice(calculatedPrice);
      setLoading(false);
    };

    calculatePrice();
  }, [car, user, destinations]);

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
                <p>
                  <strong>Seat Number:</strong> {car.sit}
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
            <p>
              <strong>Price:</strong> {price ? `${price} TK` : "Calculating..."}
            </p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default Slip;
