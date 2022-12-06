const userSchema = require("../../models/userSchema")
const bcrypt = require("bcrypt")
const generateToken = require("../../utils/generatetoken")

exports.SignUpPost = async(req,res)=>{
    console.log(req.body.email);
    try {
        
        let details = {
            firstname,
            lastname,
            email,
            password
        }=req.body
        details.password= await bcrypt.hash(req.body.password,10)
        userSchema.findOne({email:details.email}).then((result)=>{
            if(result){
                res.status(400).json("Email Or Number Exists")

            }else{
                userSchema.create(details).then((result)=>{
                    let details = {
                        firstname : result.firstname,
                        lastname : result.lastname,
                        email:result.email,
                        token:generateToken(result.id)
                    }
                    res.status(201).json(details)
                    console.log(result);
                }).catch((err)=>{
                    res.status(400)
                    // throw new Error('Eroor Occured')
                    console.log(err);
                })
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}