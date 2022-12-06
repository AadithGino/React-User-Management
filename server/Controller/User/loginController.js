const userSchema = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generatetoken");
const { response } = require("express");

exports.loginPost = async (req, res) => {
  console.log(req.body.email);
  try {
    userSchema
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          if (result.status) {
            bcrypt.compare(
              req.body.password,
              result.password,
              function (err, resp) {
                if (resp) {
                  let details = {
                    _id: result._id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    token: generateToken(result.id),
                  };
                  console.log(details);
                  res.status(200).json(details);
                } else {
                  res.status(401).json("Incorrect Password");
                  console.log("PASS INC ");
                }
              }
            );
          } else {
            res.status(401).json("Account Is Temporarly Suspended");
          }
        } else {
          res.status(400).json("User Does Not Exist");
          console.log("USER NO ");
        }
      })
      .catch((error) => {
        res.json("error");
      });
  } catch (error) {}
};

exports.addPhoto = async (req, res) => {
  let id = req.query.id;
  let pic = req.body.photo;
  console.log(id + "THIS IS THE PHOYO");
  console.log("TJHO O _ JAFDKAJSFHD FJLKLJKDSHF KHFJKLSDH FJSKDHF ");
  console.log(pic);

  try {
    userSchema
      .updateOne({ _id: id }, { $set: { photo: pic } })
      .then((data) => {
        console.log(data);
        console.log("THIS IS DATA");
        res.status(200).json("PHOTO IS UPDATED");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {}
};

exports.HOMEGET = async (req, res) => {
  try {
    userSchema.findOne({ _id: req.query.id }).then((result) => {
      let details = {
        _id: result._id,
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
        photo: result.photo,
      };
      res.status(200).json(details);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
