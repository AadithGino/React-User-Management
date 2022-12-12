const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
  photo: { type: String },
});

const model = mongoose.model("User", userSchema);

module.exports = model;
