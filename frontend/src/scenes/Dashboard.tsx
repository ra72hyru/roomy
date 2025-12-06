import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
      <div>
        Dashboard
        <button onClick={() => navigate('/rooms')}>Rooms</button>
        <button onClick={() => navigate('/users')}>Users</button>
        <button onClick={() => navigate('/bookings')}>Bookings</button>
      </div>
    )
};

export default Dashboard;