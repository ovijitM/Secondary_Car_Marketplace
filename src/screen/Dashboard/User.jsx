import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function User() {
  const location = useLocation();
  const { email, token } = location.state || {}; // Extract email and token from the passed state
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          throw new Error('Authorization token is missing.');
        }

        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data.');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div>
      <h1>User Dashboard</h1>
      {loading && <p>Loading user data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData && !loading && !error ? (
        <div>
          <h2>Welcome, {userData.username}!</h2>
          <p>Email: {email}</p>
          <p>Role: {userData.role}</p>
          <h3>Your Activities</h3>
          <ul>
            {userData.activities && userData.activities.length > 0 ? (
              userData.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <li>No activities found.</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
