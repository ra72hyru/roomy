import React from 'react';
import '../../styles/components/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Authorization';

const Sidebar = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuthContext();

    return (
        <div className='sidebar'>
            Sidebar<br></br>
            <button onClick={() => navigate('/rooms')}>Rooms</button><br></br>
            {Boolean(user?.is_admin) && <><button onClick={() => navigate('/users')}>Users</button><br></br></>}
            <button onClick={() => navigate('/bookings')}>Bookings</button><br></br>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
};

export default Sidebar;