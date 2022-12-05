const userSchema = require('../../models/userSchema')
const bcrypt = require("bcrypt")
const generateToken = require('../../utils/generatetoken')

exports.loginPost = async(req,res)=>{
    try {
        userSchema.findOne({email:req.body.email}).then((result)=>{
          if(result){
           if(result.status){
            bcrypt.compare(req.body.password,result.password,function(err,resp){
              if(resp){
                let details = {
                  _id:result._id,
                  firstname : result.firstname,
                  lastname : result.lastname,
                  email:result.email,
                  token:generateToken(result.id)
              }
              console.log(details);
                res.status(200).json(details)
              }else{
                res.status(401).json('Incorrect Password')
              }
             })
           }else{
            res.status(401).json("Account Is Temporarly Suspended")
           }
          }else{
            res.status(400).json("User Does Not Exist")
          }
        }).catch((error)=>{
            res.json("error")
        })
    } catch (error) { 
        
    }
}


exports.addPhoto = async(req,res)=>{
let id = req.body.id;
let pic = req.body.imgurl
console.log(id);
console.log("TJHO O _ JAFDKAJSFHD FJLKLJKDSHF KHFJKLSDH FJSKDHF ");
console.log(pic);

try {
  userSchema.updateOne({_id:id},{$set:{photo:pic}},function(err,res){
    if(err){
      console.log(err);
    }
  }).then((data)=>{
    res.status(200).json("Image uploaded SuccessFully")
  }).catch((err)=>{
    res.status(400).json(err)
  })
} catch (error) {
  
}
}