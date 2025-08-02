#!/bin/bash

SRC_DIR=$(pwd)

echo "Creăm fișierele în $SRC_DIR"

# App.tsx
cat > "$SRC_DIR/App.tsx" << 'EOF'
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
EOF

# Login.tsx
cat > "$SRC_DIR/Login.tsx" << 'EOF'
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (token: string, username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://oneeanek.onrender.com/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onLoginSuccess(data.token, username);
      } else {
        const err = await res.json();
        setError(err.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <h2 style={{ textAlign: 'center' }}>Login Admin</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Parolă"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      {error && <div style={{ color: '#f44336', textAlign: 'center' }}>{error}</div>}
      <button type="submit" style={buttonStyle}>Login</button>
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '16px',
  outline: 'none',
};

const buttonStyle: React.CSSProperties = {
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#e74c3c',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default Login;
EOF

# Navbar.tsx
cat > "$SRC_DIR/Navbar.tsx" << 'EOF'
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <div style={{ fontWeight: 'bold', fontSize: '24px', marginRight: 10 }}>Anek</div>
        <CardAnimation />
      </div>
    </nav>
  );
};

const CardAnimation: React.FC = () => {
  return (
    <div style={cardContainer}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            ...card,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <span role="img" aria-label="card" style={{ fontSize: '24px' }}>
            🂠
          </span>
        </div>
      ))}
      <style>{`
        @keyframes flip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#013220',
  padding: '15px 0',
  color: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.7)',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const cardContainer: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
};

const card: React.CSSProperties = {
  width: '28px',
  height: '38px',
  backgroundColor: '#fff',
  borderRadius: '6px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  animation: 'flip 2s infinite',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Navbar;
EOF

echo "Fișiere create cu succes:"
ls -l App.tsx Login.tsx Navbar.tsx
