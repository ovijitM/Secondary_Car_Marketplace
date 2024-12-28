import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Filter from "../Filter";

import car2 from "../../assets/mainscreen/brombrom.jpg";
import car3 from "../../assets/mainscreen/brombrom2.jpg";
import car4 from "../../assets/mainscreen/brombrom3.jpg";
import car5 from "../../assets/mainscreen/brombrom4.jpg";
import car6 from "../../assets/mainscreen/brombrom8-1.jpg";
import car7 from "../../assets/mainscreen/brombrom6.jpg";



function Carousels() {




  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Carousel >
        <Carousel.Item>
          <img
            src={car2}
            alt="First slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car3}
            alt="Second slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car4}
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={car5}
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car6}
            alt="Third slide"
            className="d-block w-100"
            height={690}
            width={900}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <img
            src={car7}
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
      > <Filter />
       
      </div>
    </div>
  );
}

export default Carousels;
