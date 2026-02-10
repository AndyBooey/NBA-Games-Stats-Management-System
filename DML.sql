-- Group 44: Golden Fellows
-- Shawn Singharaj and Andy Bui

-- CRUD Functionality for the NBA DBMS

-- Retrieve Game Scores + Team Names + Date
SELECT 
    ht.abbreviation AS Home,
    g.homeScore, 
    at.abbreviation AS Away,
    g.awayScore, 
    g.gameDate
FROM Games g
    JOIN Teams ht ON ht.teamId = g.homeTeamId
    JOIN Teams at ON at.teamId = g.awayTeamId;

-- Retrieve Player Box Score
SELECT 
    CONCAT(p.firstName, ' ', p.lastName) AS name,
    g.minutes,
    g.points,
    g.rebounds,
    g.assists,
    g.steals,
    g.blocks,
    g.turnovers,
    g.fgm,
    g.fga,
    g.threePm,
    g.threePa,
    g.ftm,
    g.fta
FROM Player_Game_Stats g
    JOIN Players p ON p.playerId = g.playerId;

-- Retrieve Players and team
SELECT 
    p.firstName,
    p.lastName,
    t.teamName,
    p.position
FROM Players p
    JOIN Teams t ON t.teamId = p.teamId;

-- Retrieve Season start date, to compare to a date to determine which season it is in
SELECT sesasonYear, startDate FROM Seasons;

-- Retrieve Team info
SELECT * FROM Teams;

-- Retrieve Teams' Season Stats
SELECT 
    t.teamName,
    s.seasonYear,
    ts.gamesPlayed,
    ts.wins,
    ts.losses,
    ts.pointsFor,
    ts.pointsAgainst,
    ts.assistsFor,
    ts.reboundsFor,
    ts.threePm,
    ts.threePa
FROM Seasons s
    JOIN Team_Season_Stats ts ON ts.seasonId = s.seasonId 
    JOIN Teams t ON t.teamId = ts.teamId;


-- Add player to DB
INSERT INTO Players (teamId, firstName, lastName, position)
VALUES (@teamId, @firstName, @lastName, @position);

-- Add game to DB
INSERT INTO Games (gameDate, homeTeamId, awayTeamId, homeScore, awayScore, seasonId)
VALUES (@gameDate, @homeTeamId, @awayTeamId, @homeScore, @awayScore, @seasonId);

-- Add new team to DB
INSERT INTO Teams (teamName, abbreviation, city)
VALUES (@teamName, @abbreviation, @city);

-- Add new season to DB
INSERT INTO Seasons (seasonYear, startDate, endDate)
VALUES (@seasonYear, @startDate, @endDate);

-- Update a player when he gets waived to free agency
UPDATE Players
SET teamId = NULL 
WHERE firstName = "input" AND lastName = "input";

-- Update player team when trade
UPDATE Players
SET teamId = @newTeamId
WHERE playerId = @playerId;

-- Update game score
UPDATE Games
SET homeScore = @homeScore,
    awayScore = @awayScore
WHERE gameId = @gameId;

-- Team gets renamed
UPDATE Teams
SET teamName = @teamName,
    city = @city
WHERE teamId = @teamId;

-- Delete Game + stats
DELETE FROM Player_Game_Stats
WHERE gameId = @gameId;
DELETE FROM Games 
WHERE gameId = @gameId 

-- Delete player stats 
DELETE FROM Player_Game_Stats
WHERE playerId = @playerId AND gameId = @gameId;


