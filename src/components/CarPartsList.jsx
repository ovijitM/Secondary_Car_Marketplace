import React from 'react';
import '../style/ServiceList.css'; // Ensure this is the correct path to your CSS file

const CarPartsList = ({ parts }) => {
  return (
    <div className="car-parts-grid">
      {parts.map((part) => (
        <div key={part.id} className="car-part-card">
          <img src={part.image} alt={part.name} style={{ width: '100%', height: 'auto' }} />
          <h3>{part.name}</h3>
          <p>${part.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default CarPartsList;
