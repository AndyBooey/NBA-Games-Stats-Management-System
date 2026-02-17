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
            <th>Player Id</th>
            <th>Game Id</th>
            <th>Minutes</th>
            <th>Points</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Turnovers</th>
            <th>Fgm</th>
            <th>Fga</th>
            <th>ThreePm</th>
            <th>ThreePa</th>
            <th>Ftm</th>
            <th>Fta</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s, index) => (
            <tr key={index}>
              <td>{s.playerId}</td>
              <td>{s.gameId}</td>
              <td>{s.minutes}</td>
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
              <td>
                <button type="button" onClick={() => alert("Edit not implemented yet")}>
                  Edit
                </button>
                <button type="button" onClick={() => alert("Delete not implemented yet")}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




      <h3>Add Player_Game_Stats</h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Add Games not implemented yet");
      }}>
        <input type="text" placeholder="playerId" required />
        <input type="text" placeholder="gameId" required />
        <input type="text" placeholder="minutes" required />
        <input type="text" placeholder="points" required />
        <input type="text" placeholder="rebounds" required />
        <input type="text" placeholder="assists" required />
        <input type="text" placeholder="steals" required />
        <input type="text" placeholder="blocks" required />
        <input type="text" placeholder="turnovers" required />
        <input type="text" placeholder="fgm" required />
        <input type="text" placeholder="fga" required />
        <input type="text" placeholder="threePm" required />
        <input type="text" placeholder="threePa" required />
        <input type="text" placeholder="ftm" required />
        <input type="text" placeholder="fta" required />
        <button type="submit">Add</button>
      </form>


    </div>
  );
}
