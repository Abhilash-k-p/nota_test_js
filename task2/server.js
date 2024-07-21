/*
    using express and body-parser for mocking data
    commands used
        * npm init -y
        * npm install express body-parser
    Run the Mock Server:
        command - node server.js
    Use the URL http://localhost:3000 in your AJAX requests
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

let records = [
    { id: 1, name: 'Record 1', datetime: '2024-07-19 10:00:00' },
    { id: 2, name: 'Record 2', datetime: '2024-07-19 11:00:00' }
];

app.get('/records', (req, res) => {
    res.json(records);
});

app.post('/records', (req, res) => {
    const newRecord = { id: records.length + 1, name: req.body.name, datetime: new Date().toISOString() };
    records.push(newRecord);
    res.json(newRecord);
});

app.patch('/records/:id', (req, res) => {
    const record = records.find(r => r.id === parseInt(req.params.id));
    if (record) {
        record.name = req.body.name;
        res.json(record);
    } else {
        res.status(404).send('Record not found');
    }
});

app.delete('/records/:id', (req, res) => {
    records = records.filter(r => r.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Mock server listening at http://localhost:${port}`);
});
