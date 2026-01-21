import { useEffect, useState } from 'react';

export default function Paczki({ token }) {
  const [paczki, setPaczki] = useState([]);
  const [kurierzy, setKurierzy] = useState([]);
  const [paczkomaty, setPaczkomaty] = useState([]);
  const [form, setForm] = useState({ kodPaczki: '', kurierId: '', paczkomatId: '', status: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/paczki', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setPaczki(data.paczki || []));
    fetch('/api/kurierzy', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setKurierzy(data.kurierzy || []));
    fetch('/api/paczkomaty', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => setPaczkomaty(data.paczkomaty || []));
  }, [token]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/paczki/${editId}` : '/api/paczki';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setForm({ kodPaczki: '', kurierId: '', paczkomatId: '', status: '' });
        setEditId(null);
        // reload
        return fetch('/api/paczki', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json()).then(data => setPaczki(data.paczki || []));
      });
  };

  const handleEdit = paczka => {
    setForm({ kodPaczki: paczka.kodPaczki, kurierId: paczka.kurier?._id || '', paczkomatId: paczka.paczkomat?._id || '', status: paczka.status });
    setEditId(paczka._id);
  };

  const handleDelete = id => {
    fetch(`/api/paczki/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setPaczki(paczki.filter(p => p._id !== id));
      });
  };

  return (
    <div>
      <h2>Paczki</h2>
      {msg && <div style={{color:'green'}}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
        <input name="kodPaczki" placeholder="Kod paczki" value={form.kodPaczki} onChange={handleChange} required />
        <select name="kurierId" value={form.kurierId} onChange={handleChange} required>
          <option value="">-- Kurier --</option>
          {kurierzy.map(k => <option key={k._id} value={k._id}>{k.imie} {k.nazwisko}</option>)}
        </select>
        <select name="paczkomatId" value={form.paczkomatId} onChange={handleChange} required>
          <option value="">-- Paczkomat --</option>
          {paczkomaty.map(p => <option key={p._id} value={p._id}>{p.miasto} {p.adres}</option>)}
        </select>
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
        <button type="submit">{editId ? 'Zapisz zmiany' : 'Dodaj paczkę'}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({kodPaczki:'',kurierId:'',paczkomatId:'',status:''})}}>Anuluj</button>}
      </form>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Kod paczki</th><th>Kurier</th><th>Paczkomat</th><th>Status</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {paczki.map(p => (
            <tr key={p._id}>
              <td>{p.kodPaczki}</td>
              <td>{p.kurier?.imie} {p.kurier?.nazwisko}</td>
              <td>{p.paczkomat?.miasto} {p.paczkomat?.adres}</td>
              <td>{p.status}</td>
              <td>
                <button onClick={()=>handleEdit(p)}>Edytuj</button>
                <button onClick={()=>handleDelete(p._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
