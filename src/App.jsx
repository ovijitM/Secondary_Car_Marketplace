import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login&signup/Login";
import Signup from "./screen/Login&signup/SignUp";
import Cars from "./screen/BuyCars/Carspage";
import CarDetails from "./screen/BuyCars/CarDetails";
import Rent from "./screen/Rentcars/RentPage";
import Repair from "./screen/Repair/RepairPage";
import Post from "./screen/BuyCars/Postcar";
import Admin from "./screen/Dashboard/Admin";
import User from "./screen/Dashboard/User";
import Compare from "./screen/CarCompare/CarComparison";
import Transaction from "./screen/Transaction/Transaction";
import Receipt from "./screen/Transaction/Reciept";
import Book from "./screen/Booking_cars/Booking";
import Slip from "./screen/Rentcars/slip";
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
          <Route path="/CarDetails" element={<CarDetails />} />
          // <Route path="/rentcars" element={<Rent />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/Admin_dashboard" element={<Admin />} />
          <Route path="/User _dashboard" element={<User />} />
          <Route path="/Postcar" element={<Post />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/reciept" element={<Receipt />} />
          <Route path="/RentCars" element={<Rent />} />
          <Route path="/book" element={<Book />} />
          <Route path="/post" element={<Post />} />
          <Route path="/p" element={<Slip />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
