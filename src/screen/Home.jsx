import "bootstrap/dist/css/bootstrap.min.css";
import Customnavbar from "../components/Customnavbar";
import Carousel from "../components/Carousels";
import Cards from "../components/Cards";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import "./Home.css"; // Import custom CSS for the sliding effect

function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  // Section titles
  const sections = ['Cars', 'Rent', 'Repair'];

  // Move to the next section
  const nextSection = () => {
    setCurrentSection((prevSection) => (prevSection + 1) % sections.length);
  };

  // Move to the previous section
  const prevSection = () => {
    setCurrentSection((prevSection) => (prevSection - 1 + sections.length) % sections.length);
  };

  return (
    <>
      <Customnavbar />

      {/* Carousel Section */}
      <div className="vh-100">
        <Carousel />
      </div>

      {/* Section Navigation Buttons */}
      <div className="d-flex justify-content-between mb-4">
        <Button variant="secondary" onClick={prevSection}>
          Previous
        </Button>
        <Button variant="secondary" onClick={nextSection}>
          Next
        </Button>
      </div>

      {/* Main Content Sections */}
      <Container className="my-4">
        <div className={`slider-container`}>
          <div className={`slider-content ${currentSection === 0 ? 'active' : ''}`}>
            <h2>Cars</h2>
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

          <div className={`slider-content ${currentSection === 1 ? 'active' : ''}`}>
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

          <div className={`slider-content ${currentSection === 2 ? 'active' : ''}`}>
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
