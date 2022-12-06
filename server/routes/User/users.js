const express = require("express");
const router = express.Router();

const userSingup = require("../../Controller/User/signupController");
const userLogin = require("../../Controller/User/loginController");
const userprofile = require("../../Controller/User/profileController");
const usernote = require("../../Controller/User/notesController");
const { protect } = require("../../middleware/jwtauth");
//  Singup Route
router.post("/signup", userSingup.SignUpPost);

// Login Route
router.post("/login", userLogin.loginPost);

//Profile
router.route("/profile").get(protect, userprofile.profileGet);

//HOME
router.route("/").get(protect, userLogin.HOMEGET);

//add notes
router.route("/add-notes").post(protect, usernote.addNotesPost);

//get notes
router.route("/my-notes").get(protect, usernote.getNotesPost);

//delete notes
router.route("/delete-note").get(protect, usernote.deletenote);

//add photo
router.route("/profile-photo").post(protect, userLogin.addPhoto);

module.exports = router;
