const express = require('express');
const fs = require('fs');
const notes = require('./db/db.json');
const path = require('path');
const uuid = require('uuid');
const app = express();


app.use(express.json());
app.use(express.static('public'));



//allows to navigate to the index
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//allows to navigate to the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//gets notes saved and adds to db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './db/db.json'));
});


//posts function to add to db.json
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const createNewNote = req.body;
  createNewNote.id = uuid.v4();
  notes.push(createNewNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes);
});  


app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
