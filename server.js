const express = require("express");
const path = require("path");
const helpers = require("./helpers/fileSystem.js");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Fetches existing notes for display in application
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Add a note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  res.json(newNote);
  helpers.addNote(newNote, "./db/db.json");
});

// Delete a note
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send("Note deleted");
  helpers.deleteNote(id, "./db/db.json");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
