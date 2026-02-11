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

// ####################################################################################FOR PLAYERS TABLE##############
// -----------------------------
// READ: Get all players TO DISPLAY TABLE IN FRONTEND
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

//UPDATE: Update a player

app.put('/players/:id', async (req, res) => {
  try {
    const playerId = Number(req.params.id);
    const { firstName, lastName, position, teamId } = req.body;

    //some basic validation stuff
    if(!Number.isInteger(playerId)) {
      return res.status(400).send("Invalid player ID."); //player id needs to be an integer
    }
    if (!firstName || !lastName || !position) {
      return res.status(400).send("firstName, lastName, and position are required."); //if left blank, send error
    }

    const safeTeamId = (teamId === "" || teamId === undefined) ? null : teamId;   

    //QUERY TO UPDATE A PLAYER
    const query = `     
      UPDATE Players
      SET firstName = ?, lastName = ?, position = ?, teamId = ?
      WHERE playerId = ?;
      `;

    const [result] = await db.query(query, [
      firstName,
      lastName,
      position,
      safeTeamId,
      playerId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Player not found."); //if no player with that id, send error
    }
    
    res.status(200).json({ message: "Player updated successfully." });
  } catch (error) {
    console.error("PUT /players/:id error:", error);
    res.status(500).send("Error updating player.");
  }

});


//DELETE: Delete a player       WILL NOT WORK YET SINCE IT IS CONNECTED TO THE TEAMS TABLE, NEED TO FIGURE OUT HOW TO DELETE PLAYER WITHOUT DELETING THE TEAM THEY ARE ON, OR DELETE THE TEAM TOO, NOT SURE YET
app.delete('/players/:id', async (req, res) => {
  try {
    const playerId = Number(req.params.id);

    if(!Number.isInteger(playerId)) {
      return res.status(400).send("Invalid player ID."); //player id needs to be an integer
    }

    const query = `
      DELETE FROM Players
      WHERE playerId = ?;
    `;

    const [result] = await db.query(query, [playerId]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Player not found."); //if no player with that id, send error
    }

    res.status(200).json({ message: "Player deleted successfully." });
  } catch (error) {
    console.error("DELETE /players/:id error:", error);
    res.status(500).send("Error deleting player.");
  }

});


// ##################################################################################################






// ####################################################################################FOR TEAMS TABLE##############




// ##################################################################################################




// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});