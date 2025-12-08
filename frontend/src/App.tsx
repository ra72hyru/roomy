import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Dashboard from './scenes/Dashboard';
import Rooms from './scenes/Rooms';
import Sidebar from './scenes/components/Sidebar';
import Users from './scenes/Users';
import Bookings from './scenes/Bookings';
import AuthContext, { AuthorizationContext, useAuthContext } from './Authorization';

function App() {
    const {user} = useAuthContext();

    return (
        <BrowserRouter>
          <div className="app">
            {user && <Sidebar />}
            <Routes>
              <Route path='/login' element={<LoginPage /* onLogin={handleLogin} */ />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />} />
              <Route path='/rooms' element={user ? <Rooms /> : <Navigate to='/login' />} />
              <Route path='/users' element={user?.is_admin ? <Users /> : <Navigate to='/login' />} />
              <Route path='/bookings' element={user ? <Bookings user_id={user.user_id} /> : <Navigate to='/login' />} />
              <Route path='/' element={<Navigate to={user ? '/dashboard' : '/login'} />} />
            </Routes>
          </div>
        </BrowserRouter>
    )
}

export default App;
