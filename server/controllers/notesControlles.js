const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

 const getNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find();

    if (!notes || notes.length === 0) return res.status(404).json({ message: 'Note not found' })

    res.status(200).json({ success: true, users })
})


 const createNote = asyncHandler(async (req, res) => {

    const {user, title, text} = req.body
    if(!user || !title || !text) return res.status(402).json({ message:'Fields are mising' })

    const existUser = await User.findOne(user)
    if(!existUser) return res.status(401).json({ message:'User not found' })

    const newNote = await Note.create({user, title, text})
     return res.status(200).json({  success: true, newNote})

})


 const updateNote = asyncHandler(async (req, res) => {
    const {id, title, text} = req.body
    if(!id || !title || !text) {
        return res.status(409).json({ message:'Fields are missing' })
    }

    const updatedNote = await Note.findByIdAndUpdate(id, {title, text},{new:true, runValidators:true})
    if(!updateNote){
        return res.status(402).json({ message: 'Note note found' })
    }

    return res.status(200).json({  success: true, message:`Note updated successfully`})
})


 const deleteNote = asyncHandler(async (req, res) => {
    const {id} = req.body
    if(!id){
        return res.status(402).json({ message:'Id not provided' })
    }

    const deletedNote = await Note.findByIdAndDelete(id)
    if(!deleteNote){
         return res.status(402).json({ message:'Error when deleting note' })
    }

    return res.status(200).json({ success: true, message:'Note deleted successdully' })
})



module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}