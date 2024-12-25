import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../../components/Customnavbar/Customnavbar";


import Footer from "../../components/Footer/Footer";
import Buycars from "../../components/Crousels/Buycars";
import { Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";



import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../Home.css";


export default function Home() {
  const [search, setSearch] = useState("");
  // const [New_cars, setNew_cars] = useState([]);
  // const [Used_cars, setUsed_cars] = useState([]);
  // const [visibleCount, setVisibleCount] = useState(8);// Initial number of cars to show

  const [AllCars, setAllCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;  



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
        const mergedCars = [...data.new_cars, ...data.used_cars];
        setAllCars(mergedCars);
        
        // setNew_cars(data.new_cars);
        // setUsed_cars(data.used_cars);
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




  const filteredCars = AllCars.filter(
    (car) =>
      car.brand.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // const filteredNewCars = New_cars.filter(
  //   (car) =>
  //     car.brand.toLowerCase().includes(search.toLowerCase()) ||
  //     car.model.toLowerCase().includes(search.toLowerCase())
  // );

  // const filteredUsedCars = Used_cars.filter(
  //   (car) =>
  //     car.brand.toLowerCase().includes(search.toLowerCase()) ||
  //     car.model.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <>
      <Customnavbar />
      {/* -----------------------Carousel----------------------- */}

      <Buycars />

      {/* -----------------------Car Brands----------------------- */}


      <Container className="my-4 " overflow="hidden">
        <div className={`slider-container`}>
          <div className="cars" style={{ margin: "5px 10px 50px 10px", paddingBottom: "50px" }}>
            <h2>Choose Your Dream Car</h2>
            <div className="choose-cars">



                {/* //filtering the new cars */}

              {currentCars
        
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
                                car.label === "imported"
                                ? "yellow"
                                : car.label === "new"
                                ? "green"
                                : "gray",
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


          </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center my-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              variant={currentPage === i + 1 ? "primary" : "outline-primary"}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ))}
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
