import React, { useEffect, useState } from 'react';

export default function User({ token }) {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div>
            <h1>User Dashboard</h1>
            {loading && <p>Loading user data...</p>} {/* Loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData && !loading ? (
                <div>
                    <h2>Welcome, {userData.username}!</h2>
                    <p>Role: {userData.role}</p>
                    {/* You can add more user-specific data here */}
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