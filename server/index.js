import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Sample in-memory games array
let games = [
  { id: 1, name: "Chess" },
  { id: 2, name: "Monopoly" },
];

// ----------- API ROUTES -----------

// Get all games
app.get("/api/games", (req, res) => {
  res.json(games);
});

// Add a new game
app.post("/api/games", (req, res) => {
  const newGame = {
    id: games.length + 1,
    ...req.body,
  };
  games.push(newGame);
  res.status(201).json(newGame);
});

// Update a game
app.put("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });

  games[index] = { ...games[index], ...req.body };
  res.json(games[index]);
});

// Delete a game
app.delete("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });

  const deleted = games.splice(index, 1);
  res.json(deleted[0]);
});

// ----------- SERVE REACT FRONTEND -----------

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// ----------- START SERVER -----------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
