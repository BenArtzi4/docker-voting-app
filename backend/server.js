const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'db',
    user: 'user',
    password: 'user_password',
    database: 'votes_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/vote', (req, res) => {
    const { vote } = req.body;
    if (vote !== 'android' && vote !== 'apple') {
        return res.status(400).json({ error: 'Invalid vote option' });
    }

    const sql = 'INSERT INTO votes (choice) VALUES (?)';
    db.query(sql, [vote], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Vote recorded!' });
    });
});

app.get('/results', (req, res) => {
    const sql = 'SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice';
    db.query(sql, (err, results) => {
        if (err) throw err;
        const data = results.reduce((acc, row) => {
            acc[row.choice] = row.count;
            return acc;
        }, { android: 0, apple: 0 });
        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});