const userSchema = require("../../models/userSchema")

exports.profileGet = async(req,res)=>{
    try {
        console.log(req.query);
        userSchema.findOne({_id:req.query.id}).then((data)=>{
            res.json(data)
            console.log(data);
        })
    } catch (error) {
        
    }
}