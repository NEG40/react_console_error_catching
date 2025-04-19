const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware
app.use(express.json());

// SQLite connection
const db = new sqlite3.Database('./database.db');

// Example endpoint
app.post('/errors', (req, res) => {
    const { username, error } = req.body

    const query = `INSERT INTO errors (username, error) VALUES (?, ?)`;
    db.run(query, [username, error], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database error!" });
        }
        res.status(201).json({ message: "User added successfully!", userId: this.lastID });
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});