const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  taskname: String,
  status: String,
  tag: String,
  userID: String,
});
const Notesmodel = mongoose.model("note", noteSchema);
module.exports = { Notesmodel };
