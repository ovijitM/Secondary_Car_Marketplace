import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../components/Customnavbar/Customnavbar";
import Carousel_main from "../components/Crousels/Home_main";
import Carbrand from "../components/Carbrandlogo/Carbrand";
import Footer from "../components/Footer/Footer";
import Cards from "../components/Cards/Cards";
import Repaircard from "../components/Home_Repaircards/Repaircard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Home.css";
import { Card } from "react-bootstrap";

export default function Home() {
  const [search, setSearch] = useState("");
  const [New_cars, setNew_cars] = useState([]);
  const [Used_cars, setUsed_cars] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/displaydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setNew_cars(data.new_cars);
        setUsed_cars(data.used_cars);
        console.log(New_cars);
        console.log(Used_cars);
      } else {
        console.error("Error fetching data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  //

  return (
    <>
      <Customnavbar />

      <div className="vh-100">
        <Carousel_main />
      </div>

      <div
        className="carbrandlogo"
        style={{ marginTop: "-10px", marginBottom: "50px" }}
      >
        <h2>We are Connected with</h2>

        <Carbrand />
      </div>

      <Container className="my-4 " overflow="hidden">
        <div className={`slider-container`}>
          <div className="cars" style={{ margin: "5px 10px 50px 10px" }}>
            <h2>Choose Your Dream Car</h2>
            <div className="choose-cars">
              {New_cars.map((car, index) => (
                <div key={index} className="caritem" style={{height: "100%"}}>


                  <>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={car.img}
                        alt="Red Alfa Romeo car on road near trees"
                        style={{
                          height: "180px", // Set consistent height
                          width: "auto1", // Full card width
                          objectFit: "cover", // Ensure aspect ratio is preserved
                          borderRadius: "5px 5px 0 0", // Match card styling
                        }}
                      />
                      <Card.Body style={{ }}>
                        <Row>
                          <Col xs={7}>
                            <Card.Title>{car.brand}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {car.model}
                            </Card.Subtitle>
                          </Col>
                          <Col xs={4} className="text-right">
                            <div
                              style={{
                                backgroundColor:
                                  car.label === "imported" ? "yellow" : "green",
                                color:
                                  car.label === "imported" ? "black" : "white",
                                // backgroundColor: "green",
                                // color: "white",
                                padding: "4px 8px", // Adjust padding for better alignment
                                borderRadius: "5px",
                                display: "inline-block", // Prevent unnecessary stretching
                                fontSize: "0.9rem", // Adjust font size for consistency
                                textAlign: "center",
                              }}
                            >
                              {car.label}
                            </div>
                            <div style={{ marginTop: "5px", color: "gray" }}>
                              {car.year}
                            </div>
                          </Col>
                        </Row>
                        <div style={{ textAlign: "center", margin: "10px 0" }}>
                          <h5> Price ${car.price} </h5>
                        </div>
                        <Card.Text className="" style={{fontSize: '15px'}}>{car.details}</Card.Text>
                        <Button
                          variant="primary"
                          style={{ width: "100%", overflow: "hidden" }}
                        >
                          {car.label === "imported" ? "Order Now" : "Buy Now"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                </div>
              ))}
            </div>
            <div className="load-more-section">
              <div className="fog-overlay"></div>
              <button className="load-more-btn">View all Cars</button>
            </div>
          </div>




          <div className="" style={{ marginTop: "90px" }}>
            <h2>Rent Car</h2>
            <div className="cars" style={{ margin: "5px 10px 50px 10px" }}>
              <div className="choose-cars">
                {Used_cars.map((car, index) => (
                  <div key={index} className="caritem">
                    <Cards
                      title={`${car.brand} ${car.model}`}
                      description={car.details}
                      image={car.img}
                      year={car.year}
                      price={car.price}
                      color={car.color}
                      transmission={car.transmission}
                      condition={car.condition}
                    />
                  </div>
                ))}
              </div>
              <div className="load-more-section">
                <div className="fog-overlay"></div>
                <button className="load-more-btn">Go to Rent</button>
              </div>
            </div>
          </div>

          <div className="" style={{ marginTop: "90px" }}>
            <h2>Repair Parts</h2>
            <Repaircard />
          </div>
        </div>
      </Container>
      <div className="footer-home">
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
