import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login&signup/Login";
import Signup from "./screen/Login&signup/SignUp";
import Cars from "./screen/BuyCars/Carspage";
import CarDetails from "./screen/BuyCars/CarDetails";
import Rent from "./screen/Rentcars/RentPage";
import Repair from "./screen/Repair/RepairPage";
import Post from "./screen/BuyCars/Postcar";
import Book from "./screen/Booking_cars/Booking";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/buycars" element={<Cars />} />
          <Route path="/CarDetails" element={<CarDetails />} />
          <Route path="/RentCars" element={<Rent />} />

          <Route path="/book" element={<Book />} />

          <Route path="/repair" element={<Repair />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
