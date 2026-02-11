import React, { useEffect, useState } from 'react';

export default function Teams({ backendURL }) {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    const res = await fetch(`${backendURL}/Teams`);
    const data = await res.json();
    setTeams(data);
  };

  

  useEffect(() => { loadTeams(); }, []);

  return (
    <div>
      <h2>Teams</h2>

      <table border="1">
        <thead>
          <tr>
            <th>teamId</th>
            <th>teamName</th>
            <th>conference</th>
            <th>abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.teamId}>
              <td>{t.teamId}</td>
              <td>{t.teamName}</td>
              <td>{t.conference}</td>
              <td>{t.abbreviation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
