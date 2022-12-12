const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userid: { type: mongoose.SchemaTypes.ObjectId },
  title: { type: String },
  note: { type: String },
  time: { type: String, default: Date.now() },
});

const model = mongoose.model("Notes", notesSchema);

module.exports = model;
