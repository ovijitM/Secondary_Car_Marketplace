import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function CustomNavbar() {
  return (
    <>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">DriveHub</Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link href="#features" className='px-4'>Cars</Nav.Link>
            <Nav.Link href="#Rent" className='px-4'>Rent</Nav.Link>
            <Nav.Link href="#Repair" className='px-4'>Repair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


