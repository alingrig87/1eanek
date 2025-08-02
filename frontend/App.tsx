import React, { useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');

  const onLoginSuccess = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#006400', color: 'white', fontFamily: "'Roboto', sans-serif" }}>
      <Navbar />
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, backgroundColor: '#013220', borderRadius: 15, boxShadow: '0 0 20px #0a5a0a' }}>
        {!token ? (
          <Login onLoginSuccess={onLoginSuccess} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2>Bine ai venit, {username}!</h2>
            <img src="/images/anek.png" alt="Anek" style={{ width: '200px', marginTop: 20, animation: 'pulse 2s infinite' }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default App;
