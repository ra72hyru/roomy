import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Dashboard from './scenes/Dashboard';
import Rooms from './scenes/Rooms';
import Sidebar from './scenes/components/Sidebar';
import Users from './scenes/Users';
import Bookings from './scenes/Bookings';

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(-1);

  const handleLogin = (admin: boolean, user_id: number) => {
    setIsAdmin(admin);
    setIsLoggedIn(true);
    setUserId(user_id);
  };

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path='/dashboard' element={isAdmin ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/rooms' element={isAdmin ? <Rooms /> : <Navigate to='/login' />} />
          <Route path='/users' element={isAdmin ? <Users /> : <Navigate to='/login' />} />
          <Route path='/bookings' element={isAdmin ? <Bookings user_id={userId} /> : <Navigate to='/login' />} />
          <Route path='/' element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
