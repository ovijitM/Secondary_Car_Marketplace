import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";


function Carousels() {
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`You searched for: ${searchTerm}`);
    setSearchTerm(""); // Reset search bar after submission
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            src= "https://i.ibb.co.com/19zfLG7/1.jpg"
            alt="First slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://i.ibb.co.com/NLbtswB/2.jpg"
            alt="Second slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src= "https://i.ibb.co.com/dWths61/3.jpg"
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src= "https://i.ibb.co.com/K5bymYh/4.jpg"
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src="https://i.ibb.co.com/DY9TN02/5.jpg"
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src= "https://i.ibb.co.com/cyBKMsZ/6.jpg"
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src= "https://i.ibb.co.com/zSPKZq0/7.jpg"
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}

      </Carousel>

      {/* Fixed Search Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          textAlign: "center",
          zIndex: 10, // Ensure it's above the carousel
        }}
      >
        <form onSubmit={handleSearch} style={{ display: "inline-block" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            style={{
              width: "800px",
              padding: "10px",
              borderRadius: "18px",
              border: "2px solid #ccc",
              boxshadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              outline: "none",
              fontSize: "16px",
              color: "black", // Ensures the text inside is black
              caretColor: "black", // Ensures the cursor is black
              backgroundColor: "white",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "15px 25px",
              marginLeft: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "18px",
              cursor: "pointer",
              fontSize: "15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Carousels;
