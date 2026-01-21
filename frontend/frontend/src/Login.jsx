import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          onLogin(data.token);
        } else {
          setError(data.wiadomosc || 'Błąd logowania');
        }
      })
      .catch(() => setError('Błąd połączenia z serwerem'));
  };

  return (
    <div style={{maxWidth:400,margin:'40px auto'}}>
      <h2>Logowanie</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Hasło" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}
