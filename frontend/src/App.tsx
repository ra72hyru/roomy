import { useState } from 'react';
import './App.css';
import LoginPage from './scenes/LoginPage';
import Dashboard from './scenes/Dashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      {isAdmin 
              ? <Dashboard />
              : <LoginPage onLogin={setIsAdmin} />
      } 
    </div>
  )
}

export default App;
