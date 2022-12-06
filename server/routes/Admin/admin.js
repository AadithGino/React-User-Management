var express = require('express');
var router = express.Router();

const adminlogin = require('../../Controller/Admin/logincontroller')
const admin = require("../../Controller/Admin/admincontroller")
const { protect } = require('../../middleware/jwtauth');

//login 
router.post("/login",adminlogin.adminloginpost)

//home
router.route("/").get(protect,adminlogin.adminHome)

//user status change 
router.route("/block").get(protect,adminlogin.adminBlock)

//search 
router.post("/search",admin.searchUser)

//delete user 
router.route("/delete").get(protect,admin.deleteUser)


module.exports = router;
