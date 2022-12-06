const adminSchema = require("../../models/adminSchema");
const userSchema = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generatetoken");

exports.adminloginpost = async (req, res) => {
  adminSchema.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      bcrypt.compare(req.body.password, data.password, function (err, resp) {
        console.log(resp);
        console.log(err);
        if (resp) {
          const details = {
            email: data.email,
            token: generateToken(data._id),
          };
          res.status(200).json(details);
        } else {
          res.status(401).json("Invalid Password");
        }
      });
    } else {
      res.status(401).json("Admin Not Valid");
    }
  });
};

exports.adminHome = async (req, res) => {
  console.log("HEHEH");
  userSchema.find().then((data) => {
    res.status(200).json(data);
  });
};

exports.adminBlock = async (req, res) => {
  userSchema.findOne({ _id: req.query.id }).then((result) => {
    userSchema.updateOne(
      { _id: req.query.id },
      { $set: { status: !result.status } },
      function (err, respo) {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  userSchema.find().then((data) => {
    res.status(200).json(data);
  });
};
