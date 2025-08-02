import React, { useEffect, useState } from 'react';

interface Tournament {
  _id: string;
  date: string;
  time: string;
  event: string;
  buyIn: number;
  gtd: number;
  reentries: number;
  totalCost: number;
  winnings: number;
  profit: number;
}

const AdminTournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form state pentru adăugare / editare
  const [form, setForm] = useState<Omit<Tournament, '_id'>>({
    date: '',
    time: '',
    event: '',
    buyIn: 0,
    gtd: 0,
    reentries: 0,
    totalCost: 0,
    winnings: 0,
    profit: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://oneeanek.onrender.com/tournaments');
      if (!res.ok) throw new Error('Failed to fetch tournaments');
      const data = await res.json();
      setTournaments(data);
    } catch (err) {
      setError('Eroare la încărcarea turneelor');
    }
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'event' || name === 'date' || name === 'time' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Nu ești autentificat');
      return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `https://oneeanek.onrender.com/tournaments/${editingId}`
        : 'https://oneeanek.onrender.com/tournaments';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Eroare server');
      }

      setForm({
        date: '',
        time: '',
        event: '',
        buyIn: 0,
        gtd: 0,
        reentries: 0,
        totalCost: 0,
        winnings: 0,
        profit: 0,
      });
      setEditingId(null);
      fetchTournaments();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (tournament: Tournament) => {
    const { _id, ...rest } = tournament;
    setForm(rest);
    setEditingId(_id);
  };

  const handleDelete = async (_id: string) => {
    if (!token) {
      setError('Nu ești autentificat');
      return;
    }
    if (!window.confirm('Ești sigur că vrei să ștergi turneul?')) return;

    try {
      const res = await fetch(`https://oneeanek.onrender.com/tournaments/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Eroare la ștergere');
      }
      fetchTournaments();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Admin Turnee</h2>
      <button
        onClick={handleLogout}
        style={{
          marginBottom: 20,
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Logout
      </button>

      {error && <div style={{ color: '#f44336', marginBottom: 10 }}>{error}</div>}

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxWidth: 400,
        }}
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="event"
          placeholder="Eveniment"
          value={form.event}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="buyIn"
          placeholder="Buy-in"
          value={form.buyIn}
          onChange={handleInputChange}
          required
          min={0}
        />
        <input
          type="number"
          name="gtd"
          placeholder="GTD"
          value={form.gtd}
          onChange={handleInputChange}
          required
          min={0}
        />
        <input
          type="number"
          name="reentries"
          placeholder="Reentries"
          value={form.reentries}
          onChange={handleInputChange}
          required
          min={0}
        />
        <input
          type="number"
          name="totalCost"
          placeholder="Cost total"
          value={form.totalCost}
          onChange={handleInputChange}
          required
          min={0}
        />
        <input
          type="number"
          name="winnings"
          placeholder="Winnings"
          value={form.winnings}
          onChange={handleInputChange}
          required
          min={0}
        />
        <input
          type="number"
          name="profit"
          placeholder="Profit"
          value={form.profit}
          onChange={handleInputChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#27ae60',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          {editingId ? 'Salvează Modificările' : 'Adaugă Turneu'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                date: '',
                time: '',
                event: '',
                buyIn: 0,
                gtd: 0,
                reentries: 0,
                totalCost: 0,
                winnings: 0,
                profit: 0,
              });
              setError('');
            }}
            style={{
              marginTop: 10,
              padding: '10px',
              borderRadius: 10,
              border: 'none',
              backgroundColor: '#ccc',
              cursor: 'pointer',
            }}
          >
            Anulează
          </button>
        )}
      </form>

      {loading ? (
        <p>Se încarcă turneele...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th>Data</th>
              <th>Ora</th>
              <th>Eveniment</th>
              <th>Buy-in</th>
              <th>GTD</th>
              <th>Reentries</th>
              <th>Cost Total</th>
              <th>Winnings</th>
              <th>Profit</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map(t => (
              <tr key={t._id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{t.date}</td>
                <td>{t.time}</td>
                <td>{t.event}</td>
                <td>{t.buyIn}</td>
                <td>{t.gtd}</td>
                <td>{t.reentries}</td>
                <td>{t.totalCost}</td>
                <td>{t.winnings}</td>
                <td>{t.profit}</td>
                <td>
                  <button
                    onClick={() => handleEdit(t)}
                    style={{
                      marginRight: 8,
                      padding: '6px 10px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: '#3498db',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Editează
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTournaments;
