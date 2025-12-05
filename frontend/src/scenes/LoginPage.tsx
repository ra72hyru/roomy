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

    const handleLogin = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8000/login', {
	            method: "POST",
                headers: {"Content-Type": "application/json"},
	            body: JSON.stringify({username: user as string, password: password as string})
            });

            if (!response.ok) {
                throw new Error('Invalid Username or Password');
            } else {
                const retUser = await response.json();
                onLogin(retUser.is_admin);
                navigate('/dashboard');
            }
        } catch (err) {
            setError((err as Error).message);
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