

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../Customnavbar/Components.css";



function CustomNavbar() {







  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };





  return (
    <>
      <Navbar bg="black" data-bs-theme="dark" style={{position:'sticky', top:'0', zIndex:'1000'}} expand="lg" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://i.ibb.co.com/KhVd4zj/Drive-Nextlogo.png"
              className="px-4 nav-link"
              alt="DriveNext"
              style={{ width: "auto", height: "40px" }}
            />
          </Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/buycars" className="px-4 nav-link">

              Cars
            </Nav.Link>
            <Nav.Link as={Link} to="/rentcars" className="px-4 nav-link">
              Rent
            </Nav.Link>
            <Nav.Link as={Link} to="/Repair" className="px-4 nav-link">
              Repair
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="px-4 nav-link">
              Insurance
            </Nav.Link>

            <Nav.Link as={Link} to="/compare" className="px-4 nav-link">
              Compare
            </Nav.Link>

            <Nav.Link as={Link} to="/" className="px-4 nav-link">
              Loan
            </Nav.Link>

          </Nav>



         {/* //main structure for using authToken */}
          {/* {(localStorage.getItem("authToken")) ?  <Nav.Link className="px-4 nav-link" aria-current="page" to="/">
                Dashboard
              </Nav.Link>:'' } */} 


          <Nav >
          {(!localStorage.getItem("authToken")) ?
            <div className='d-flex '><Nav.Link as={Link} to="/login" className="px-4 nav-link">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="px-4 nav-link">
              Signup
            </Nav.Link></div>: 
            <div className='d-flex alignitem-center '><Nav.Link as={Link} to="/User_dashboard" className="px-4 nav-link">
           <img src="https://i.ibb.co.com/R7X7qK1/Male-User.png" alt="Male-User" border="0" className="" style={{ height: '35px'}}/>
          </Nav.Link>
          <Nav.Link className="px-4 nav-link" style={{ display: 'flex', alignItems: 'center' }} onClick={handleLogout}>
            Logout?
          </Nav.Link></div>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
