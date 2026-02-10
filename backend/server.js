// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 4589;


// -----------------------------
// READ: Get all players
// -----------------------------
app.get('/players', async (req, res) => {
  try {
    const query = `
      SELECT playerId, firstName, lastName, position, teamId
      FROM Players
      ORDER BY playerId;
    `;
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("GET /players error:", error);
    res.status(500).send("Error fetching players.");
  }
});


// -----------------------------
// CREATE: Add a player
// -----------------------------
app.post('/players', async (req, res) => {
  try {
    const { firstName, lastName, position, teamId } = req.body;

    // basic validation
    if (!firstName || !lastName || !position) {
      return res.status(400).send("firstName, lastName, and position are required.");
    }

    // Allow NULL for teamId
    const safeTeamId =
      teamId === "" || teamId === undefined ? null : teamId;

    const query = `
      INSERT INTO Players (firstName, lastName, position, teamId)
      VALUES (?, ?, ?, ?);
    `;

    const [result] = await db.query(query, [
      firstName,
      lastName,
      position,
      safeTeamId
    ]);

    // Return the new id (handy for debugging)
    res.status(201).json({ insertedId: result.insertId });
  } catch (error) {
    console.error("POST /players error:", error);
    res.status(500).send("Error creating player.");
  }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});