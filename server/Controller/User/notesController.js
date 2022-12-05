const { response } = require('express');
const notesSchema = require('../../models/notesSchema')

exports.addNotesPost = async(req,res)=>{
   try {
    req.query.id;
    const details ={
        userid:req.query.id,
        title:req.body.title,
        note:req.body.notes
    }

    notesSchema.create(details).then((data)=>{
        res.status(201).json(data)
    }).catch((error)=>{
        res.status(400).json(error)
    })
    console.log(details);
   } catch (error) {
    
   }

   
}


exports.getNotesPost = async(req,res)=>{
    try {
        notesSchema.find({userid:req.query.id}).then((data)=>{
            res.status(200).json(data)
        })

        
    } catch (Error) {
        res.status(400).json(Error.message)
    }
}


exports.deletenote = async(req,res)=>{
    let id = req.query.id;
    try {
        notesSchema.deleteOne({_id:id}).then((data)=>{
            res.status(200).json("SUCCESSS FULLY DELETED")
        }).catch((err)=>{
            res.status(400).json(err)
        })
    } catch (error) {
        
    }
}