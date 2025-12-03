import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLogin: (isAdmin: boolean) => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = (): void => {
        if (user === 'admin' && password === 'password') {
            onLogin(true);
            navigate('/dashboard');
        } else {
            setError('Invalid Username or Password');
        }
    }

    return (
    <div className='login-page-container'>
        <div className='login-page'>
            <h1>Login</h1>
            <input placeholder='Username' onChange={(e) => {setUser(e.target.value); setError('')}} />
            <input placeholder='Password' onChange={(e) => {setPassword(e.target.value); setError('')}} type='password'/>
            <button onClick={() => handleLogin()}>Login</button>
            <span style={{color: 'red'}}>{error}</span>
        </div>
    </div>
  )
}

export default LoginPage;