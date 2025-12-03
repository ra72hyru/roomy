import React from 'react';

interface LoginPageProps {
    onLogin: (isAdmin: boolean) => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  return (
    <div>
        <input placeholder='Username' />
        <input placeholder='Password' />
        <button onClick={() => onLogin(true)}>Login</button>
    </div>
  )
}

export default LoginPage;