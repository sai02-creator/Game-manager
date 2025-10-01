// server/index.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// In-memory games array (replace with DB if needed)
let games = [
  { id: 1, name: "Game 1" },
  { id: 2, name: "Game 2" },
];

// API routes
app.get("/api/games", (req, res) => {
  res.json(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find((g) => g.id === Number(req.params.id));
  if (!game) return res.status(404).json({ error: "Game not found" });
  res.json(game);
});

app.post("/api/games", (req, res) => {
  const newGame = { id: Date.now(), ...req.body };
  games.push(newGame);
  res.status(201).json(newGame);
});

app.put("/api/games/:id", (req, res) => {
  const index = games.findIndex((g) => g.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });

  games[index] = { ...games[index], ...req.body };
  res.json(games[index]);
});

app.delete("/api/games/:id", (req, res) => {
  const index = games.findIndex((g) => g.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });

  const deleted = games.splice(index, 1);
  res.json(deleted[0]);
});

// Serve React build
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Catch-all for React routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
