import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../components/customnavbar.css'; // Import Link for routing

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

      <Navbar bg="" data-bs-theme="dark" style={{height:'60px' , backgroundColor:'#1d242b'}}>
        <Container>
          {/* <Navbar.Brand as={Link} to="/">DriveHub</Navbar.Brand> Updated for routing */}
          <Navbar.Brand as={Link} to="/"><img 
        src="/src/assets/drivenext_logo.png" 
        alt="DriveNext Logo" 
        style={{ height: '60px', width: 'auto', position:'relative', left:'-100px' , color: 'black' }}   
      /></Navbar.Brand>
           
          
          <Nav className="mx-auto">
          <Nav.Link as={Link} to="/buycars" className="px-4 nav-link-hover" style={{ marginRight:'10px'}}>Cars</Nav.Link>
          <Nav.Link as={Link} to="/rentcars" className="px-4 nav-link-hover" style={{ marginRight:'10px'}}>Rent</Nav.Link>
          <Nav.Link as={Link} to="/Repair" className="px-4 nav-link-hover" style={{ marginRight:'10px'}}>Repair</Nav.Link>
          <Nav.Link as={Link} to="/" className="px-4 nav-link-hover" style={{ marginRight:'10px'}}><img 
        src="/src/assets/Fast Cart.png" 
        alt="Fast Cart Logo" 
        style={{ height: '30px', width: 'auto', position:'relative' }}   
      /></Nav.Link>
      
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/login" className="px-4 nav-link-hover">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup" className="px-4 nav-link-hover">Signup</Nav.Link>
            

          </Nav>
        </Container>
        <Nav.Link as={Link} to="/" className="px-4 nav-link-hover2" style={{ marginRight:'10px'}}><img 
        src="/src/assets/User.png" 
        alt="User-Dashboard Logo" 
        style={{ height: '50px', width: 'auto'}}   
      /></Nav.Link>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
