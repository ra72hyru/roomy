import React from 'react';
import '../../styles/components/Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className='sidebar'>
            Sidebar<br></br>
            <button onClick={() => navigate('/rooms')}>Rooms</button><br></br>
            <button onClick={() => navigate('/users')}>Users</button><br></br>
            <button onClick={() => navigate('/bookings')}>Bookings</button>
        </div>
    )
};

export default Sidebar;