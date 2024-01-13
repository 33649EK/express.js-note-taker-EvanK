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

// Default route for handling all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  res.json(newNote);
  res.send("Note added");
  helpers.readAndAppend(newNote, "./db/db.json");
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.send("Note deleted");
  helpers.readAndDelete(id, "./db/db.json");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
