import React, { useEffect, useState } from 'react';

export default function Player_Game_Stats({ backendURL }) {
  const [stats, setStats] = useState([]);

  const loadStats = async () => {
    const res = await fetch(`${backendURL}/Player_Game_Stats`);
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => { loadStats(); }, []);

  return (
    <div>
      <h2>Player Game Stats</h2>

      <table border="1">
        <thead>
          <tr>
            <th>playerId</th>
            <th>gameId</th>
            <th>points</th>
            <th>rebounds</th>
            <th>assists</th>
            <th>steals</th>
            <th>blocks</th>
            <th>turnovers</th>
            <th>fgm</th>
            <th>fga</th>
            <th>threePm</th>
            <th>threePa</th>
            <th>ftm</th>
            <th>fta</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, index) => (
            <tr key={index}>
              <td>{s.playerId}</td>
              <td>{s.gameId}</td>
              <td>{s.points}</td>
              <td>{s.rebounds}</td>
              <td>{s.assists}</td>
              <td>{s.steals}</td>
              <td>{s.blocks}</td>
              <td>{s.turnovers}</td>
              <td>{s.fgm}</td>
              <td>{s.fga}</td>
              <td>{s.threePm}</td>
              <td>{s.threePa}</td>
              <td>{s.ftm}</td>
              <td>{s.fta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
