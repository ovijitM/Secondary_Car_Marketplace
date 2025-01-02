import { useEffect, useState } from 'react';

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token

            try {
                const response = await fetch('http://localhost:5000/api/users', {
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
                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchUsers();
    }, []); // Removed token from dependency array

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {loading && <p>Loading users...</p>} {/* Loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}