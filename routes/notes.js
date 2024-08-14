const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  getNotes,
  createNote,
  editNote,
  deleteNote,
} = require("../controllers/notes.js");

const router = express.Router();

router.get("/", authMiddleware, getNotes);
router.post("/", authMiddleware, createNote);
router.patch("/:id", authMiddleware, editNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
