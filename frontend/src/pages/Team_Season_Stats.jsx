import React, { useEffect, useState } from 'react';

export default function Team_Season_Stats({ backendURL }) {
  const [stats, setStats] = useState([]);

  const loadStats = async () => {
    const res = await fetch(`${backendURL}/Team_Season_Stats`);
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => { loadStats(); }, []);

  return (
    <div>
      <h2>Team Season Stats</h2>

      <table border="1">
        <thead>
          <tr>
            <th>teamId</th>
            <th>seasonId</th>
            <th>wins</th>
            <th>losses</th>
            <th>pointsFor</th>
            <th>pointsAgainst</th>
            <th>assistsFor</th>
            <th>reboundsFor</th>
            <th>threePm</th>
            <th>threePa</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, index) => (
            <tr key={index}>
              <td>{s.teamId}</td>
              <td>{s.seasonId}</td>
              <td>{s.wins}</td>
              <td>{s.losses}</td>
              <td>{s.pointsFor}</td>
              <td>{s.pointsAgainst}</td>
              <td>{s.assistsFor}</td>
              <td>{s.reboundsFor}</td>
              <td>{s.threePm}</td>
              <td>{s.threePa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
