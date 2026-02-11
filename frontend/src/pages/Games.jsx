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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
