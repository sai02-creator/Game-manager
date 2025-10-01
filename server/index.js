// index.js (Server)
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Dummy in-memory game data (replace with DB if needed)
let games = [
  { id: 1, name: "Game 1" },
  { id: 2, name: "Game 2" },
];

// API routes
app.get("/api/games", (req, res) => {
  res.json(games);
});

app.post("/api/games", (req, res) => {
  const newGame = { id: games.length + 1, ...req.body };
  games.push(newGame);
  res.status(201).json(newGame);
});

app.put("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });
  
  games[index] = { ...games[index], ...req.body };
  res.json(games[index]);
});

app.delete("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found" });

  const deleted = games.splice(index, 1);
  res.json(deleted[0]);
});

// Serve React (Vite) build
const clientPath = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientPath));

// Wildcard route to serve index.html for React Router
app.get("/*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
