import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../Customnavbar/Components.css";

function CustomNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <Navbar
        bg="black"
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ zIndex: 1000 }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://i.ibb.co.com/KhVd4zj/Drive-Nextlogo.png"
              alt="DriveNext"
              style={{ width: "auto", height: "40px" }}
            />
          </Navbar.Brand>

          {/* Toggle button for mobile view */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Collapsible content */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/buycars" className="px-3">
                Cars
              </Nav.Link>
              <Nav.Link as={Link} to="/rentcars" className="px-3">
                Rent
              </Nav.Link>
              <Nav.Link as={Link} to="/repair" className="px-3">
                Repair
              </Nav.Link>
              <Nav.Link as={Link} to="/insurance" className="px-3">
                Insurance
              </Nav.Link>
              <Nav.Link as={Link} to="/compare" className="px-3">
                Compare
              </Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              {!localStorage.getItem("authToken") ? (
                <div className="d-flex flex-column flex-lg-row">
                  <Nav.Link as={Link} to="/login" className="px-3">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="px-3">
                    Signup
                  </Nav.Link>
                </div>
              ) : (
                <div className="d-flex align-items-center flex-column flex-lg-row">
                  <Nav.Link
                    as={Link}
                    to={
                      userRole === "admin"
                        ? "/Admin_dashboard"
                        : "/User_dashboard"
                    }
                    className="px-3"
                  >
                    <img
                      src="https://i.ibb.co.com/R7X7qK1/Male-User .png"
                      alt="User"
                      style={{ height: "35px" }}
                    />
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="px-3">
                    Logout?
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
