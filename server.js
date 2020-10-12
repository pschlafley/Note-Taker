const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');


app.get('/api/notes', (req, res) => {
    // res.send('Hello!');
    res.json(notes);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
