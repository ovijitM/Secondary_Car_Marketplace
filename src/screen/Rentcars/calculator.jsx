import React, { useState } from "react";

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

const RentCalculator = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [sit, setSit] = useState(4);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setPrice(null); // Reset price

    // Normalize inputs to lowercase and trim
    const normalizedPickup = pickup.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();

    // Find the matching route
    const route = destinations.find(
      (d) =>
        d.from.toLowerCase() === normalizedDestination &&
        d.to.toLowerCase() === normalizedPickup
    );

    if (!route) {
      setError(`Invalid route from ${pickup} to ${destination}.`);
      return;
    }

    // Calculate the price based on seat number
    const ratePerKm = sit > 4 ? 10 : 5; // Corrected rate logic
    const calculatedPrice = route.distance * ratePerKm;
    setPrice(calculatedPrice);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Rent Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Pick Up:</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pick-up location"
            required
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Seat Number:</label>
          <input
            type="number"
            value={sit}
            onChange={(e) => setSit(Number(e.target.value))}
            placeholder="Enter seat number"
            required
            min="4"
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Calculate Rent
        </button>
      </form>

      {price !== null && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h3>Total Rent: {price} TK</h3>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};

export default RentCalculator;
