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
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [New_cars, setNew_cars] = useState([]);
  const [Used_cars, setUsed_cars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Initial number of cars to show
  const [loadMoreClicks, setLoadMoreClicks] = useState(0); // Track load-more button clicks
  const navigate = useNavigate(); 

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
        // console.log(New_cars);
      } else {
        console.log("Error fetching data:", data.message);
      }
    } catch  {
      console.log("Error fetching data:");
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleLoadMore = () => {
    if (loadMoreClicks >= 1) {
      // Navigate to another page after 2 clicks
      navigate("/buycars");
    } else {
      setVisibleCount(visibleCount + 4);
      setLoadMoreClicks(loadMoreClicks + 1);
    }
  };

  const filteredNewCars = New_cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
  );

  // const filteredUsedCars = Used_cars.filter(
  //   (car) =>
  //     car.brand.toLowerCase().includes(search.toLowerCase()) ||
  //     car.model.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <>
      <Customnavbar />
      {/* -----------------------Carousel----------------------- */}

      <div className="vh-100">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Carousel>
            <Carousel.Item>
              <img
                src="https://i.ibb.co.com/19zfLG7/1.jpg"
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
                src="https://i.ibb.co.com/dWths61/3.jpg"
                alt="Third slide"
                className="d-block w-100"
                height={690}
                width={900}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://i.ibb.co.com/K5bymYh/4.jpg"
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
                src="https://i.ibb.co.com/cyBKMsZ/6.jpg"
                alt="Third slide"
                className="d-block w-100"
                height={690}
                width={900}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>{" "}
            <Carousel.Item>
              <img
                src="https://i.ibb.co.com/zSPKZq0/7.jpg"
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
             // White background
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              textAlign: "center",
              zIndex: 10, // Ensure it's above the carousel
            }}
          >
            <div style={{ display: "inline-block" }}>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="//Search for your dream car"
                style={{
                  width: "800px",
                  padding: "10px",
                  borderRadius: "18px",
                  border: "2px solidrgb(132, 130, 130)",
                  outline: "none",
                  fontSize: "16px",
                  color: "Black", // White text color
                  backgroundColor: "transparent", // Transparent background
                  transition: "background-color 0.3s ease, filter 0.3s ease", // Smooth transition
                }}onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#fafafa"; // Slight white tint
                  e.target.style.filter = "blur(0.1px)"; // Blur effect
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Reset background
                  e.target.style.filter = "none"; // Remove blur
                }}
              />

            </div>
          </div>
        </div>
      </div>

      {/* -----------------------Car Brands----------------------- */}


      <Container className="my-4 " overflow="hidden">
        <div className={`slider-container`}>
          <div className="cars" style={{ margin: "5px 10px 50px 10px", paddingBottom: "50px" }}>
            <h2>Choose Your Dream Car</h2>
            <div className="choose-cars">



                {/* //filtering the new cars */}

              {filteredNewCars.slice(0, visibleCount)
        
                .map((car, index) => (
                  <div
                    key={index}
                    className="caritem"
                    style={{ height: "100%" }}
                  >
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={car.img}
                        alt="Car Image"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "5px 5px 0 0",
                        }}
                      />
                      <Card.Body>
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
                                padding: "4px 8px",
                                borderRadius: "5px",
                                display: "inline-block",
                                fontSize: "0.9rem",
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
                        <Card.Text style={{ fontSize: "15px" }}>
                          {car.details}
                        </Card.Text>
                        <Button
                          variant="primary"
                          style={{ width: "100%", overflow: "hidden" }}
                        >
                          {car.label === "imported" ? "View details for Order" : "View details for Buy"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>

            {/* Load More Button */}
            {visibleCount < New_cars.length && (
              <div className="load-more-section">
                <div className="fog-overlay"></div>
                <button className="load-more-btn" onClick={handleLoadMore}>
                  {loadMoreClicks >= 1 ? "View More Cars" : "Load More"}
                </button>
              </div>
            )}
          </div>





          
      <div
        className="carbrandlogo"
        style={{ marginBottom: "50px", marginBottom: "50px", paddingBottom: "50px" }}
      >
        <h2>We are Connected with</h2>
        <Carbrand />
      </div>

          {/* -----------------------Rent Car----------------------- */}

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

          {/* -----------------------Repair Parts----------------------- */}

          <div className="" style={{ marginTop: "90px" }}>
            <h2>Repair Parts</h2>
            <Repaircard />
          </div>
        </div>
      </Container>

      {/* -----------------------Footer----------------------- */}

      <div className="footer-home">
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
