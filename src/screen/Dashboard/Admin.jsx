import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";
import Footer from "../../components/Footer/Footer";
import "./admin.css";

export default function Admin() {
  const [userinfo, setUserinfo] = useState({});
  const [users, setUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCar, setTotalCar] = useState(0);
  const [totalKYC, setTotalKYC] = useState(0);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (!token) {
      return;
    }

    const user = decodeToken(token);
    setUserinfo(user);

    try {
      const response = await fetch("http://localhost:8000/api/admin", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setUsers(data.users);
        setTotalCar(data.totalCar);
        setTotalRevenue(data.totalRevenue);
        setTotalKYC(data.totalKYC);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CustomNavbar />
      <div className="admin-dashboard">
        <div className="admin-container">
          <h1 className="admin-title">Admin Dashboard</h1>
          <h2>Admin Information</h2>
          <div className="admin-info">
            <p>
              <strong>Email:</strong> {userinfo.email}
            </p>
            <p>
              <strong>Name:</strong> {userinfo.name}
            </p>
            <p>
              <strong>Role:</strong> {userinfo.role}
            </p>
          </div>
          <h1>Admin Stats</h1>
          <div className="admin-stats">
            <div className="stat-card">
              <h2>Total Revenue</h2>
              <p>${totalRevenue}</p>
            </div>
            <div className="stat-card">
              <h2>Existing Users</h2>
              <p>{users.length}</p>
            </div>
            <div className="stat-card">
              <h2>Total Cars</h2>
              <p>{totalCar}</p>
            </div>
            <div className="stat-card">
              <h2>KYC Applications</h2>
              <div className="kyc-applications">
                <div class="container-center">
                  <Link to="/kyc_applications">
                    <button className="btn btn-primary">
                      Kyc applications
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <h2>Rent Service</h2>
              <div class="container-center">
                <Link to="/Rent_service">
                  <button className="btn btn-primary">Rent Portal</button>
                </Link>
              </div>
            </div>
            <div className="stat-card">
              <h2>Repair Service</h2>
              <div class="container-center">
                <Link to="/Repair_service">
                  <button className="btn btn-primary">Repair Portal</button>
                </Link>
              </div>
            </div>
          </div>

          <h2>User Management</h2>
          <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/user/${user._id}`}>
                          <button className="btn btn-view">View</button>
                        </Link>
                        <button className="btn btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
