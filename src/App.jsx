import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login&signup/Login";
import Signup from "./screen/Login&signup/SignUp";
import Cars from "./screen/BuyCars/Carspage";
import CarDetails from "./screen/BuyCars/CarDetails";
import Rent from "./screen/Rentcars/RentPage";
import Repair from './screen/Repair/RepairPage';
import BookingForm from './screen/Repair/BookingForm'; 
import ServicesList from './components/ServicesList'; // Import ServicesList component

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buycars" element={<Cars />} />
          <Route path="/cardetails" element={<CarDetails />} />
          <Route path="/rentcars" element={<Rent />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/booking" element={<BookingForm />} /> 
          {/* New Route for ServicesList */}
          <Route 
            path="/services" 
            element={
              <div>
                <h1>Available Services</h1>
                <ServicesList />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
