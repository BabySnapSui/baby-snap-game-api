const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Baby Snap Game API is running"
  });
});

app.get("/leaderboard", (req, res) => {

  const leaderboard = [
    { rank: 1, username: "SnapKing", score: 12400 },
    { rank: 2, username: "TurtleBoss", score: 10350 },
    { rank: 3, username: "BabySnapSui", score: 9980 }
  ];

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
