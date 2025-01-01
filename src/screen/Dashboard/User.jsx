import { useEffect, useState } from "react";
import CustomNavbar from "../../components/Customnavbar/Customnavbar";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);

  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1]; // Extract the payload part of the JWT
      const decoded = JSON.parse(atob(payload)); // Decode Base64 to a JSON object
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage
    if (token) {
      const decoded = decodeToken(token); // Decode the token
      setUserInfo(decoded); // Store the decoded data in state
    }
  }, []); // Run once on component mount

  return (
    <div>
    <CustomNavbar/> 
    <div>
      {userInfo ? (
        <div>
          <h1>Welcome, {userInfo.email}</h1>
          <p>Role: {userInfo.role}</p>
        </div>
      ) : (
        <h1>Please log in</h1>
      )}
    </div></div>
  );
}
