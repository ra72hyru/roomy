import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    
    return (
      <div>
        Dashboard
        <button onClick={() => navigate('/rooms')}>Rooms</button>
      </div>
    )
};

export default Dashboard;