import { useState } from 'react';

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.wiadomosc === 'Dodano uzytkownika') {
          setSuccess('Rejestracja udana! Możesz się zalogować.');
          setError('');
          setEmail('');
          setPassword('');
          if (onRegister) onRegister();
        } else {
          setError(data.wiadomosc || 'Błąd rejestracji');
          setSuccess('');
        }
      })
      .catch(() => setError('Błąd połączenia z serwerem'));
  };

  return (
    <div style={{maxWidth:400,margin:'40px auto'}}>
      <h2>Rejestracja</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}} data-testid="register-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Hasło" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
}
