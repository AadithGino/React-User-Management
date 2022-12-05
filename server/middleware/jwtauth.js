const asynchandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const user = require('../models/userSchema')


const protect = asynchandler(async(req,res,next)=>{
    let token;
    console.log(req.headers.authorization);
    if(req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            console.log(token+"he");
            const decoded = jwt.verify(token,'noteapp1234');
            req.user = await user.findById(decoded.id).select("-password");
            console.log("HHEHEHEHE AUTH ENENEN");
            next();
        } catch (error) {
            res.status(401).json("TOKEN INVALID")
            console.log("E");
        }
      }

      if(!token){
        res.status(401).json("MUNJI")
        console.log("U");
      }
})

module.exports = {protect}
