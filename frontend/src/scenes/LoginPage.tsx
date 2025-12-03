import React from 'react';
import '../styles/LoginPage.css';

interface LoginPageProps {
    onLogin: (isAdmin: boolean) => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div className='login-page-container'>
        <div className='login-page'>
            <h1>Login</h1>
            <input placeholder='Username' />
            <input placeholder='Password' />
            <button onClick={() => onLogin(true)}>Login</button>
        </div>
    </div>
  )
}

export default LoginPage;