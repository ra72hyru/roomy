import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Dashboard from './scenes/Dashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage onLogin={setIsAdmin} />} />
        <Route path='/dashboard' element={isAdmin ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/' element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
