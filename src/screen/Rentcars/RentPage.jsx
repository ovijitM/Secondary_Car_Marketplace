import React, { useEffect, useState } from "react";
import "./RentCars.css"; // Optional CSS file for styling

const RentCars = () => {
  const [cars, setCars] = useState([]);
  const [Message, setErrorMessage] = useState("");

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rentCar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setCars(data.data);
      } else {
        setErrorMessage(data.message);
      }
    } catch {
      console.log("hey not foud");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="rent-cars-container">
      <h1>Available Rental Cars</h1>
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className="car-image"
            />
            <div className="car-details">
              <h2>{`${car.brand} ${car.model} (${car.year})`}</h2>
              <p>
                <strong>Price:</strong> ${car.price}
              </p>
              <p>
                <strong>Mileage:</strong> {car.mileage} miles
              </p>
              <p>
                <strong>Color:</strong> {car.color}
              </p>
              <p>
                <strong>Transmission:</strong> {car.transmission}
              </p>
              <p>
                <strong>Condition:</strong> {car.condition}
              </p>
              <p>
                <strong>Label:</strong> {car.label}
              </p>
              <p>
                <strong>Details:</strong> {car.details}
              </p>
              <p>
                <strong>Purchase Location:</strong> {car.purchase_location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentCars;
