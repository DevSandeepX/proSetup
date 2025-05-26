const express = require ('express')
const {getNotes, createNote, updateNote, deleteNote} = require('../controllers/notesControlles')
const router = express.Router()


router.route('/')
      .get(getNotes)
      .post(createNote)
      .patch(updateNote)
      .delete(deleteNote)

module.exports = router