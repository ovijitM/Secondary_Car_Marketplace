import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link for routing

function CustomNavbar() {
  return (
    <>
      <Navbar bg="black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" >DriveHub</Navbar.Brand> {/* Updated for routing */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/buycars" className="px-4 ">Cars</Nav.Link>
            <Nav.Link as={Link} to="/rentcars" className="px-4" >Rent</Nav.Link>
            <Nav.Link as={Link} to="/Repair" className="px-4">Repair</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="px-4" >Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="px-4" >Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
