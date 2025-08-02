import React, { useEffect, useState } from 'react';

interface Tournament {
  _id: string;
  event: string;
  buyIn: number;
  guaranteed: number;
  reentries: number;
  totalCost: number;
  winnings: number;
  profit: number;
}

const ViewOnlyTournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://oneeanek.onrender.com/tournaments')
      .then(res => res.json())
      .then(data => {
        console.log("Turnee încărcate:", data);
        setTournaments(data[0].tournaments);
      })
      .catch(() => setError('Eroare la încărcarea turneelor.'));
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 15, marginBottom: 30 }}>
        <img
          src="/images/anek.png"
          alt="Anek"
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #205072'
          }}
        />
        <div>
          <h1 style={{ margin: 0, color: '#205072' }}>Anek Rail</h1>
          <p style={{ margin: 0, fontSize: 14, color: '#406882' }}>Urmărește parcursul lui Anek în turnee</p>
        </div>
      </div>

      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      {!error && tournaments.length === 0 && <p style={{ textAlign: 'center' }}>Se încarcă...</p>}

      {tournaments.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: 10, overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(to right, #205072, #329d9c)', color: 'white' }}>
                <th style={thStyle}>Eveniment</th>
                <th style={thStyle}>Buy-In (€)</th>
                <th style={thStyle}>GTD (€)</th>
                <th style={thStyle}>Re-entries</th>
                <th style={thStyle}>Cost Total (€)</th>
                <th style={thStyle}>Câștiguri (€)</th>
                <th style={thStyle}>Profit (€)</th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((t, index) => (
                <tr
                  key={t._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#e9eff1',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d0e7ea')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : '#e9eff1')}
                >
                  <td style={tdStyle}>{t.event}</td>
                  <td style={tdStyle}>{t.buyIn ?? '-'}</td>
                  <td style={tdStyle}>{t.guaranteed ?? '-'}</td>
                  <td style={tdStyle}>{t.reentries ?? '-'}</td>
                  <td style={tdStyle}>{t.totalCost ?? '-'}</td>
                  <td style={tdStyle}>{t.winnings ?? '-'}</td>
                  <td
                    style={{
                      ...tdStyle,
                      color: t.profit > 0 ? '#28a745' : t.profit < 0 ? '#dc3545' : '#333',
                      fontWeight: 'bold',
                    }}
                  >
                    {t.profit ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const thStyle: React.CSSProperties = {
  padding: '14px 12px',
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '15px',
  whiteSpace: 'nowrap'
};

const tdStyle: React.CSSProperties = {
  padding: '12px 10px',
  textAlign: 'center',
  fontSize: '14px',
};

export default ViewOnlyTournaments;
