

import { useState } from 'react';
import './App.css';
import Kurierzy from './Kurierzy.jsx';
import Paczki from './Paczki.jsx';
import Paczkomaty from './Paczkomaty.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

function App() {
  const [tab, setTab] = useState('kurierzy');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (tok) => {
    setToken(tok);
    localStorage.setItem('token', tok);
  };
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  if (!token) {
    if (showRegister) {
      return <>
        <Register onRegister={() => setShowRegister(false)} />
        <div style={{textAlign:'center',marginTop:10}}>
          <button onClick={()=>setShowRegister(false)}>Masz konto? Zaloguj się</button>
        </div>
      </>;
    }
    return <>
      <Login onLogin={handleLogin} />
      <div style={{textAlign:'center',marginTop:10}}>
        <button onClick={()=>setShowRegister(true)}>Nie masz konta? Zarejestruj się</button>
      </div>
    </>;
  }

  // HOC do przekazywania tokena do fetch
  const withToken = (Component) => (props) => <Component {...props} token={token} />;

  return (
    <div className="container">
      <nav className="tabs">
        <button className={tab === 'kurierzy' ? 'active' : ''} onClick={() => setTab('kurierzy')}>Kurierzy</button>
        <button className={tab === 'paczki' ? 'active' : ''} onClick={() => setTab('paczki')}>Paczki</button>
        <button className={tab === 'paczkomaty' ? 'active' : ''} onClick={() => setTab('paczkomaty')}>Paczkomaty</button>
        <button style={{float:'right'}} onClick={handleLogout}>Wyloguj</button>
      </nav>
      <main>
        {tab === 'kurierzy' && withToken(Kurierzy)({})}
        {tab === 'paczki' && withToken(Paczki)({})}
        {tab === 'paczkomaty' && withToken(Paczkomaty)({})}
      </main>
    </div>
  );
}

export default App;
