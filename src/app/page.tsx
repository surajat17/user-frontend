'use client'
import { useState, useEffect } from 'react';

interface User {
  username: string;
  employeeId: string;
  email: string;
  role: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?page=${page}&limit=10&username=${username}&role=${role}`);
    const data = await response.json();
    console.log(data);
    setUsers(data.users);
    setTotal(data.pagination.totalCount);
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ marginRight: '10px', padding: '5px' }}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="collector">Collector</option>
        </select>
        <button onClick={handleSearch} style={{ padding: '5px' }}>Search</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '10px' }}>Username</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Employee ID</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Email</th>
            <th style={{ border: '1px solid black', padding: '10px' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.employeeId}>
              <td style={{ border: '1px solid black', padding: '10px' }}>{user.username}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{user.employeeId}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{user.email}</td>
              <td style={{ border: '1px solid black', padding: '10px' }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ marginRight: '10px', padding: '5px' }}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={page * 10 >= total} style={{ marginLeft: '10px', padding: '5px' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
