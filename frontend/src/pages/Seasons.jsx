import React, { useEffect, useState } from 'react';

export default function Seasons({ backendURL }) {
  const [seasons, setSeasons] = useState([]);

  const loadSeasons = async () => {
    const res = await fetch(`${backendURL}/seasons`);
    const data = await res.json();
    setSeasons(data);
  };

  useEffect(() => { loadSeasons(); }, []);

  return (
    <div>
      <h2>Seasons</h2>

      <table border="1">
        <thead>
          <tr>
            <th>seasonId</th>
            <th>seasonYear</th>
            <th>startDate</th>
            <th>endDate</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((s) => (
            <tr key={s.seasonId}>
              <td>{s.seasonId}</td>
              <td>{s.seasonYear}</td>
              <td>{String(s.startDate).slice(0, 10)}</td>
              <td>{String(s.endDate).slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
