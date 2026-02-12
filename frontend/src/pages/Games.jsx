import React, { useEffect, useState } from 'react';

export default function Games({ backendURL }) {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    const res = await fetch(`${backendURL}/games`);
    const data = await res.json();
    setGames(data);
  };

  useEffect(() => { loadGames(); }, []);

  return (
    <div>
      <h2>Games</h2>

      <table border="1">
        <thead>
          <tr>
            <th>gameId</th>
            <th>gameDate</th>
            <th>seasonId</th>
            <th>homeTeamId</th>
            <th>awayTeamId</th>
            <th>homeScore</th>
            <th>awayScore</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g) => (
            <tr key={g.gameId}>
              <td>{g.gameId}</td>
              <td>{String(g.gameDate).slice(0, 10)}</td>
              <td>{g.seasonId}</td>
              <td>{g.homeTeamId}</td>
              <td>{g.awayTeamId}</td>
              <td>{g.homeScore}</td>
              <td>{g.awayScore}</td>
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

      <h3>Add Games</h3>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Add Games not implemented yet");
      }}>
        <input type="text" placeholder="gameDate" required />
        <input type="text" placeholder="seasonId" required />
        <input type="text" placeholder="homeTeamId" required />
        <input type="text" placeholder="awayTeamId" required />
        <input type="text" placeholder="homeScore" required />
        <input type="text" placeholder="awayScore" required />
        <button type="submit">Add</button>
      </form>


    </div>
  );
}
