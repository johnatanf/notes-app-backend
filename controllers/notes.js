const Note = require("../models").Note;
const UserAccount = require("../models").UserAccount;
require("dotenv").config();

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      include: [
        { model: UserAccount, attributes: ["id"], where: { id: req.user.id } },
      ],
    });

    return res.json(notes);
  } catch (err) {
    next(err);
  }
};

const createNote = async (req, res, next) => {
  try {
    return res.json({ message: "createNote" });
  } catch (err) {
    next(err);
  }
};

const editNote = async (req, res, next) => {
  try {
    return res.json({ message: `editNote ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    return res.json({ message: `deleteNote ${req.params.id}` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotes,
  createNote,
  editNote,
  deleteNote,
};
