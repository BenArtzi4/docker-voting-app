const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

const dbConfig = {
    host: 'db',
    user: 'user',
    password: 'user_password',
    database: 'votes_db'
};

let db;
function connectWithRetry() {
    db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error('Error connecting to the database:', err);
            console.log('Retrying connection in 5 seconds...');
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Connected to the database');
        }
    });

    db.on('error', err => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database connection lost. Reconnecting...');
            connectWithRetry();
        } else {
            throw err;
        }
    });
}

connectWithRetry();

app.post('/vote', (req, res) => {
    const { vote } = req.body;
    if (vote !== 'android' && vote !== 'apple') {
        return res.status(400).json({ error: 'Invalid vote option' });
    }

    console.log(`Vote received: ${vote}`); // Log the vote option

    const sql = 'INSERT INTO votes (choice) VALUES (?)';
    db.query(sql, [vote], (err, result) => {
        if (err) {
            console.error('Error inserting vote:', err);
            return res.status(500).json({ error: 'Failed to record vote' });
        }
        res.json({ message: 'Vote recorded!' });
    });
});

app.get('/results', (req, res) => {
    const sql = 'SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching results:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
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

process.on('SIGINT', () => {
    console.log('Gracefully shutting down...');
    db.end(err => {
        if (err) {
            console.error('Error during disconnection:', err);
        } else {
            console.log('Disconnected from the database');
        }
        process.exit();
    });
});
