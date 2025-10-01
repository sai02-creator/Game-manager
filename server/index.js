import express from "express";
import cors from "cors";
import { games } from "./fakeDB.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());

// === API Routes ===
app.get("/api/games", (req, res) => res.json(games));

app.post("/api/games", (req, res) => {
  const newGame = req.body;
  games.push({ ...newGame, id: games.length + 1 });
  res.status(201).json(newGame);
});

app.put("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const newUpdatedGame = req.body;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found." });

  games[index] = {
    ...games[index],
    name: newUpdatedGame.name,
    platform: newUpdatedGame.platform,
    genre: newUpdatedGame.genre,
  };
  res.json(games[index]);
});

app.delete("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return res.status(404).json({ error: "Game not found." });

  const deletedGame = games.splice(index, 1)[0];
  res.json(deletedGame);
});

app.get("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const game = games.find((g) => g.id === Number(id));
  if (!game) return res.status(404).json({ error: "Game not found." });

  res.json(game);
});

// === Serve React Frontend (Vite) ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Vite build output
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all route for React frontend routing
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next(); // skip API routes
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// === Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
