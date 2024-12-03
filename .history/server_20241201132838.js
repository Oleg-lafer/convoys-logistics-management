const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const Driver = require('./src/driver');
const Truck = require('./src/truck');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let db = new sqlite3.Database('./src/database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/addDriver', (req, res) => {
    const { name, familyName, driverLicense, status } = req.body;
    console.log('Received Driver Data:', req.body);
    const driver = new Driver(null, name, familyName, driverLicense, status);
    const sql = `INSERT INTO drivers (name, familyName, driverLicense, status) VALUES (?, ?, ?, ?)`;
    db.run(sql, [driver.name, driver.familyName, driver.driverLicense, driver.status], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.post('/addTruck', (req, res) => {
    const { licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength } = req.body;
    console.log('Received Truck Data:', req.body);
    const truck = new Truck(licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength);
    db.run(`INSERT INTO trucks(licensePlate, type, cargoBeanHeight, cargoBeanWidth, tacoBellLength) VALUES(?, ?, ?, ?, ?)`, 
        [truck.licensePlate, truck.type, truck.cargoBeanHeight, truck.cargoBeanWidth, truck.tacoBellLength], function(err) {
        if (err) {
            return console.log(err.message);
        }
        res.send({ id: this.lastID });
    });
});

app.get('/drivers', (req, res) => {
    db.all(`SELECT * FROM drivers`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/trucks', (req, res) => {
    db.all(`SELECT * FROM trucks`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});