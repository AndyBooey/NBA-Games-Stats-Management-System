import React, { useEffect, useState } from 'react';

export default function Players({ backendURL }) {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: ''
  });

  const loadPlayers = async () => {
    const res = await fetch(`${backendURL}/players`);
    const data = await res.json();
    setPlayers(data);
  };

  useEffect(() => { loadPlayers(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      teamId: null   // always free agent
    };

    await fetch(`${backendURL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setFormData({ firstName: '', lastName: '', position: '' });
    loadPlayers();
  };

  return (
    <div>
      <h2>Players</h2>

      <table border="1">
        <thead>
          <tr>
            <th>playerId</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>position</th>
            <th>teamId</th>
          </tr>
        </thead>
        <tbody>
          {players.map(p => (
            <tr key={p.playerId}>
              <td>{p.playerId}</td>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.position}</td>
              <td>{p.teamId ?? 'NULL'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add Player</h3>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
