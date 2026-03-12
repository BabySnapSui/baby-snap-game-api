const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const players = new Map();

app.get("/", (req, res) => {
  res.json({
    message: "Baby Snap Game API is running"
  });
});

app.post("/submit-score", (req, res) => {
  const { username, score } = req.body;

  if (!username || typeof score !== "number") {
    return res.status(400).json({
      success: false,
      error: "username and numeric score are required"
    });
  }

  const cleanUsername = String(username).trim().slice(0, 30);
  const cleanScore = Math.max(0, Math.floor(score));

  const existing = players.get(cleanUsername) || 0;

  if (cleanScore > existing) {
    players.set(cleanUsername, cleanScore);
  }

  return res.json({
    success: true,
    savedScore: players.get(cleanUsername)
  });
});

app.get("/leaderboard", (req, res) => {
  const leaderboard = Array.from(players.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([username, score], index) => ({
      rank: index + 1,
      username,
      score
    }));

  res.json(leaderboard);
});

app.post("/claim/daily", (req, res) => {
  const reward = {
    coins: 250,
    energy: 25,
    boost: "crit_boost"
  };

  res.json({
    success: true,
    reward
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Baby Snap API running on port", PORT);
});
