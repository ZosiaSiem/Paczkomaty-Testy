import { useEffect, useState } from 'react';

export default function Paczkomaty({ token }) {
  const [paczkomaty, setPaczkomaty] = useState([]);
  const [form, setForm] = useState({ miasto: '', adres: '', pojemnosc: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const [paczki, setPaczki] = useState([]);
  const [showPaczki, setShowPaczki] = useState(null);

  useEffect(() => {
    fetch('/api/paczkomaty', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setPaczkomaty(data.paczkomaty || []));
  }, [token]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/paczkomaty/${editId}` : '/api/paczkomaty';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setForm({ miasto: '', adres: '', pojemnosc: '' });
        setEditId(null);
        // reload
        return fetch('/api/paczkomaty', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json()).then(data => setPaczkomaty(data.paczkomaty || []));
      });
  };

  const handleEdit = paczkomat => {
    setForm({ miasto: paczkomat.miasto, adres: paczkomat.adres, pojemnosc: paczkomat.pojemnosc });
    setEditId(paczkomat._id);
  };

  const handleDelete = id => {
    fetch(`/api/paczkomaty/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setPaczkomaty(paczkomaty.filter(p => p._id !== id));
      });
  };

  const handleShowPaczki = id => {
    if (showPaczki === id) {
      setShowPaczki(null);
      setPaczki([]);
      return;
    }
    fetch(`/api/paczkomaty/${id}/paczki`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setPaczki(data.paczki || []);
        setShowPaczki(id);
      });
  };

  return (
    <div>
      <h2>Paczkomaty</h2>
      {msg && <div style={{color:'green'}}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
        <input name="miasto" placeholder="Miasto" value={form.miasto} onChange={handleChange} required />
        <input name="adres" placeholder="Adres" value={form.adres} onChange={handleChange} required />
        <input name="pojemnosc" placeholder="Pojemność" value={form.pojemnosc} onChange={handleChange} required />
        <button type="submit">{editId ? 'Zapisz zmiany' : 'Dodaj paczkomat'}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({miasto:'',adres:'',pojemnosc:''})}}>Anuluj</button>}
      </form>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Miasto</th><th>Adres</th><th>Pojemność</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {paczkomaty.map(p => (
            <tr key={p._id}>
              <td>{p.miasto}</td>
              <td>{p.adres}</td>
              <td>{p.pojemnosc}</td>
              <td>
                <button onClick={()=>handleEdit(p)}>Edytuj</button>
                <button onClick={()=>handleDelete(p._id)}>Usuń</button>
                <button onClick={()=>handleShowPaczki(p._id)}>{showPaczki === p._id ? 'Ukryj paczki' : 'Pokaż paczki'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPaczki && (
        <div style={{marginTop:20}}>
          <h3>Paczki dostarczone do paczkomatu</h3>
          {paczki.length === 0 ? <div>Brak paczek</div> : (
            <table border="1" cellPadding="6">
              <thead>
                <tr>
                  <th>Kod paczki</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paczki.map(p => (
                  <tr key={p._id}>
                    <td>{p.kodPaczki}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
