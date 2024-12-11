import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../components/Customnavbar";
import Carousel from "../components/Carousels";
import Cards from "../components/Cards";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css"; 
function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  
  const sections = ['Cars', 'Rent', 'Repair'];

 
  const nextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

 
  const prevSection = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
  };

  return (
    <>
      <Customnavbar />

  
      <div className="vh-100">
        <Carousel />
      </div>


      <div className="d-flex justify-content-between mb-4">
        <Button variant="secondary" onClick={prevSection}>
          Previous
        </Button>
        <Button variant="secondary" onClick={nextSection}>
          Next
        </Button>
      </div>


      <Container className="my-4">
        <div className={`slider-container`}>
          <div >
            <h2>Cars</h2>
            <Row>
              <Col style={{color:'black'}}>
                <Cards />
              </Col>
              <Col style={{color:'black'}}>
                <Cards />
              </Col>
              <Col style={{color:'black'}}>
                <Cards />
              </Col>
            </Row>
          </div>

          <div >
            <h2>Rent</h2>
            <Row>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
            </Row>
          </div>

          <div >
            <h2>Repair</h2>
            <Row>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Cards />
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
