import React, { useState } from "react";
import "./CarComparison.css";

const CarComparison = () => {
  const [searchQueries, setSearchQueries] = useState(["", "", "", ""]);
  const [selectedCars, setSelectedCars] = useState([null, null, null, null]);
  const [suggestions, setSuggestions] = useState([[], [], [], []]);

  const handleSearchChange = async (index, value) => {
    setSearchQueries((prev) => {
        const newQueries = [...prev];
        newQueries[index] = value;
        return newQueries;
    });

    if (!value.trim()) {
        setSuggestions((prev) => {
            const newSuggestions = [...prev];
            newSuggestions[index] = [];
            return newSuggestions;
        });
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/api/cars?q=${value}`); 
        if (response.ok) {
            const data = await response.json();
            setSuggestions((prev) => {
                const newSuggestions = [...prev];
                newSuggestions[index] = data;
                return newSuggestions;
            });
        } else {
            console.error("Failed to fetch suggestions:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching suggestions:", error);
    }
};

  const handleAddCar = (index, car) => {
    setSelectedCars((prev) => {
      const updatedCars = [...prev];
      updatedCars[index] = car;
      return updatedCars;
    });

    setSearchQueries((prev) => {
      const newQueries = [...prev];
      newQueries[index] = "";
      return newQueries;
    });

    setSuggestions((prev) => {
      const newSuggestions = [...prev];
      newSuggestions[index] = [];
      return newSuggestions;
    });
  };

  const handleRemoveCar = (index) => {
    setSelectedCars((prev) => {
      const updatedCars = [...prev];
      updatedCars[index] = null;
      return updatedCars;
    });
  };

  const renderRow = (label, key) => (
    <tr>
      <td>{label}</td>
      {selectedCars.map((car, index) => (
        <td key={index}>{car ? car[key] || "" : ""}</td>
      ))}
    </tr>
  );

  return (
    <div className="comparison-container">
      <h1>Car Comparison</h1>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Choose your car</th>
              {selectedCars.map((_, index) => (
                <th key={index}>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Search and Select Car"
                      className="search-bar"
                      value={searchQueries[index]}
                      onChange={(e) => handleSearchChange(index, e.target.value)}
                    />
                    {suggestions[index].length > 0 && (
                      <ul className="suggestions">
                        {suggestions[index].map((car) => (
                          <li key={car.id} onClick={() => handleAddCar(index, car)}>
                            {car.img && <img src={car.img} alt={`${car.brand} ${car.model}`} />}
                            {car.brand} {car.model} {car.label && `(${car.label})`}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedCars.some(car => car !== null) && (
              <>
                {renderRow("Brand", "brand")}
                {renderRow("Model", "model")}
                {renderRow("Year", "year")}
                {renderRow("Mileage", "mileage")}
                {renderRow("Color", "color")}
                {renderRow("Transmission", "transmission")}
                {renderRow("Label", "label")}
                {renderRow("Condition", "condition")}
                {renderRow("Purchase Location", "purchase_location")}
                {renderRow("Price", "price")}
                <tr>
                  <td>Image</td>
                  {selectedCars.map((car, index) => (
                    <td key={index}>
                      {car && car.img ? (
                        <img
                          src={car.img}
                          alt={`${car.brand} ${car .model}`}
                          className="car-image"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarComparison;