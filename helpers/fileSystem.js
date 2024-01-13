const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Reads existing content and adds incoming note to json file.
const addNote = (content, file) => {
  // Reads existing notes from json file.
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Adds incoming note to json file.
      const parsedData = JSON.parse(data);
      // Adds a unique id to note.
      content.id = uuidv4();
      // Pushes new note to existing notes.
      parsedData.push(content);
      // Writes new data to json file.
      fs.writeFile(file, JSON.stringify(parsedData, null, 4), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Note added successfully!");
        }
      });
    }
  });
};

// Reads existing content and deletes note with matching id.
const deleteNote = (id, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Parses existing data.
      const parsedData = JSON.parse(data);
      // Filters out note with matching id.
      const appendedData = parsedData.filter((note) => note.id !== id);
      // Writes new data to json file.
      fs.writeFile(file, JSON.stringify(appendedData, null, 4), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully deleted note!");
        }
      });
    }
  });
};

// Exports functions for use in server.js.
module.exports = { addNote, deleteNote };
