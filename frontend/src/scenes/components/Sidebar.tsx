import '../../styles/components/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../Authorization';

const Sidebar = () => {
    const {user, logout} = useAuthContext();

    return (
        <div className='sidebar-container'>
            <nav className='sidebar-nav'>
                <NavLink to='/rooms' className={({isActive}) => isActive ? 'active-page page-link' : 'page-link'}>All Rooms</NavLink>
                {Boolean(user?.is_admin) && <NavLink to='/users' className={({isActive}) => isActive ? 'active-page page-link' : 'page-link'}>Users</NavLink>}
                <NavLink to='/bookings' className={({isActive}) => isActive ? 'active-page page-link' : 'page-link'}>Bookings</NavLink>
            </nav>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
};

export default Sidebar;