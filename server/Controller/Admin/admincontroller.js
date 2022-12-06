const { json } = require("express");
const { NotBeforeError } = require("jsonwebtoken");
const userSchema = require("../../models/userSchema");
const notesSchema = require("../../models/notesSchema");

exports.searchUser = async (req, res) => {
  try {
    let username = req.body.searchkeyword;
    userSchema
      .find({ firstname: { $regex: ".*" + username + ".*", $options: "i" } })
      .then((data) => {
        res.status(200).json(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  let id = req.query.id;
  console.log("DEKEE UzxczczczxcxzcD " + id);
  try {
    notesSchema.deleteMany({ userid: id });
    userSchema
      .deleteOne({ _id: id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json("Some error Occured");
      });
  } catch (error) {
    res.status(400).json(err.message);
  }
};
