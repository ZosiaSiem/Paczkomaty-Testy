import { useEffect, useState } from 'react';

export default function Kurierzy({ token }) {
  const [kurierzy, setKurierzy] = useState([]);
  const [form, setForm] = useState({ imie: '', nazwisko: '', email: '', nrTelefonu: '' });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/kurierzy', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setKurierzy(data.kurierzy || []));
  }, [token]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/kurierzy/${editId}` : '/api/kurierzy';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setForm({ imie: '', nazwisko: '', email: '', nrTelefonu: '' });
        setEditId(null);
        // reload
        return fetch('/api/kurierzy', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json()).then(data => setKurierzy(data.kurierzy || []));
      });
  };

  const handleEdit = kurier => {
    setForm({ imie: kurier.imie, nazwisko: kurier.nazwisko, email: kurier.email, nrTelefonu: kurier.nrTelefonu });
    setEditId(kurier._id);
  };

  const handleDelete = id => {
    fetch(`/api/kurierzy/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        setMsg(data.wiadomość || '');
        setKurierzy(kurierzy.filter(k => k._id !== id));
      });
  };

  return (
    <div>
      <h2>Kurierzy</h2>
      {msg && <div style={{color:'green'}}>{msg}</div>}
      <form onSubmit={handleSubmit} style={{marginBottom:20}}>
        <input name="imie" placeholder="Imię" value={form.imie} onChange={handleChange} required />
        <input name="nazwisko" placeholder="Nazwisko" value={form.nazwisko} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="nrTelefonu" placeholder="Nr telefonu" value={form.nrTelefonu} onChange={handleChange} required />
        <button type="submit">{editId ? 'Zapisz zmiany' : 'Dodaj kuriera'}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({imie:'',nazwisko:'',email:'',nrTelefonu:''})}}>Anuluj</button>}
      </form>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Imię</th><th>Nazwisko</th><th>Email</th><th>Nr telefonu</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {kurierzy.map(k => (
            <tr key={k._id}>
              <td>{k.imie}</td>
              <td>{k.nazwisko}</td>
              <td>{k.email}</td>
              <td>{k.nrTelefonu}</td>
              <td>
                <button onClick={()=>handleEdit(k)}>Edytuj</button>
                <button onClick={()=>handleDelete(k._id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
