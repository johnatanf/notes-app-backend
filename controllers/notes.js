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
    const { title, text } = req.body;

    const newNote = await Note.create({
      user_account_id: req.user.id,
      title,
      text,
    });

    return res.json(newNote);
  } catch (err) {
    next(err);
  }
};

const editNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const { title, text } = req.body;

    const existingNote = await Note.findOne({
      include: [
        {
          model: UserAccount,
          attributes: ["id"],
        },
      ],
      where: {
        id: noteId,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ message: `note ${noteId} does not exist` });
    }

    if (existingNote.UserAccount.id !== req.user.id) {
      return res
        .status(403)
        .json({ message: `you are not authorised to edit note ${noteId}` });
    }

    await Note.update(
      { title, text },
      {
        where: {
          id: noteId,
        },
      }
    );

    return res.json({ message: `update note ${noteId} successful` });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.id;

    const existingNote = await Note.findOne({
      include: [
        {
          model: UserAccount,
          attributes: ["id"],
        },
      ],
      where: {
        id: noteId,
      },
    });

    if (!existingNote) {
      return res.status(404).json({ message: `note ${noteId} does not exist` });
    }

    if (existingNote.UserAccount.id !== req.user.id) {
      return res
        .status(403)
        .json({ message: `you are not authorised to delete note ${noteId}` });
    }

    await Note.destroy({
      where: {
        id: noteId,
      },
    });

    return res.status(204).send();
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
