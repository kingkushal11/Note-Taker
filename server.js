const express = require('express');
const path = require('path');
const fs = require("fs");
let notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    const addNote = req.body ;
    addNote.id = uuidv4()
    notes.push(addNote);
    fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(notes));
    res.json(notes);

});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const deletearr = notes.filter(note => note.id !== id);
  notes = deletearr;
  fs.writeFileSync(path.join(__dirname,'./db/db.json'), JSON.stringify(notes));
  res.json(notes);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
