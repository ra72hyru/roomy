import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Authorization';

const LoginPage = () => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {login} = useAuthContext();

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
                const retData = await response.json();
                const retUser = retData.user;
                login({user_id: retUser.id, first_name: retUser.first_name, last_name: retUser.last_name, is_admin: retUser.is_admin});
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