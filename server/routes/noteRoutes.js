const express = require ('express')
const {getNotes, createNote, updateNote, deleteNote} = require('../controllers/notesControlles')
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')
router.use(verifyJWT)

router.route('/')
      .get(getNotes)
      .post(createNote)
      .patch(updateNote)
      .delete(deleteNote)

module.exports = router