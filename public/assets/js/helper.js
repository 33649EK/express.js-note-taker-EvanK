const { v4: uuidv4 } = require("uuid");

const noteId = () => {
  return uuidv4();
};

module.exports = noteId;
