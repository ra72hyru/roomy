import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Dashboard from './scenes/Dashboard';
import Sidebar from './scenes/components/Sidebar';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (admin: boolean) => {
    setIsAdmin(admin);
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && <Sidebar />}
        <Routes>
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path='/dashboard' element={isAdmin ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/' element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
