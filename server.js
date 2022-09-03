const express = require('express');
const path = require('path');

const uuid = require('uuid-with-v6');

const app = express();
const PORT = process.env.PORT || 3001;

let db = require('./db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Sends you to index.html page when opened
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Sends you to notes.html page when button is pressed
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Creates api path
app.get('/api/notes', (req, res) => {
    res.send(db);
}
);

app.post('/api/notes', (req, res) => {
    // creates a unique id for the note
    let id = uuid.v6();
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: id
    };
    db.push(newNote);
    res.send(db);
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
