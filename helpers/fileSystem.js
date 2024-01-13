const fs = require("fs");

// Reads existing content and adds incoming note to json file.
const readAndAppend = (content, file) => {
  // Reads existing notes from json file.
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Adds incoming note to json file.
      const parsedData = JSON.parse(data);
      parsedData.push(content);
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

const readAndDelete = (id, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      const appendedData = parsedData.filter((note) => note.id !== id);
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

module.exports = { readAndAppend, readAndDelete };
