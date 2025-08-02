import React, { useState } from "react";

const App: React.FC = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("https://oneeanek.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      setError("Network error");
    }
  };

  if (token) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h2>Bine ai venit, {username}!</h2>
        <img
          src="/images/anek.png"
          alt="Anek"
          style={{ width: 200, animation: "spin 4s linear infinite" }}
        />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 300, margin: "50px auto" }}>
      <h2>Login Admin</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
          autoComplete="current-password"
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
