import express from 'express'
import cors from 'cors'
import { games } from './fakeDB.js'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/games", (req, res) => {
    res.json(games)
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
});