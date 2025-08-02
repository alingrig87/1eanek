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
