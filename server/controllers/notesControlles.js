const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

 const getNotes = asyncHandler(async (req, res) => {
    // Use req.user (from verifyJWT) to find the user
    const foundUser = await User.findOne({ username: req.user }).exec();
    if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

    const notes = await Note.find({ user: foundUser._id }).exec();
    if (!notes || notes.length === 0) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ success: true, notes });
});


const createNote = asyncHandler(async (req, res) => {
    const user = req.user
    const {  title, text } = req.body;  // user bhi req.body me hona chahiye

    if (!user || !title || !text) {
        return res.status(400).json({ message: 'Fields are missing' });
    }

    // User dhundho by username or id (jo bhi aap bhejte ho)
    const existUser = await User.findOne({ username: user });  
    if (!existUser) {
        return res.status(401).json({ message: 'User not found' });
    }

    const newNote = await Note.create({
        user: existUser._id,  // user field me user id dena chahiye (assuming schema me)
        title,
        text
    });

    return res.status(201).json({ success: true, newNote });
});



const updateNote = asyncHandler(async (req, res) => {
    const { id, title, text } = req.body;

    if (!id || !title || !text) {
        return res.status(400).json({ message: 'Fields are missing' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, text },
        { new: true, runValidators: true }
    );

    if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json({ success: true, message: 'Note updated successfully', updatedNote });
});



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