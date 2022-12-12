const express = require("express");
const { Notesmodel } = require("../Model/notes.model");
const notesRouter = express.Router();

notesRouter.get("/", async (req, res) => {
  const { userID } = req.body;
  const status = req.query.status;

  try {
    if (status) {
      const onlynotes = await Notesmodel.find({
        userID: userID,
        status: status,
      });
      res.send(onlynotes);
    } else {
      const onlynotes = await Notesmodel.find({ userID: userID });
      res.send(onlynotes);
    }
  } catch (err) {
    res.send(err.message);
  }
});

notesRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    await Notesmodel.create(payload);
    res.send({ msg: "notes created" });
  } catch (err) {
    res.send(err.message);
  }
});

notesRouter.patch("/update/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  const payload = req.body;
  try {
    const note = await Notesmodel.findOne({ _id: noteID });
    if (note.userID == req.body.userID) {
      await Notesmodel.findByIdAndUpdate({ _id: noteID }, payload);
      res.send({ msg: "Note updated successfully" });
    } else {
      res.send({ msg: "Note Authorized" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

notesRouter.delete("/delete/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  try {
    const note = await Notesmodel.findOne({ _id: noteID });
    if (note.userID == req.body.userID) {
      await Notesmodel.findByIdAndDelete({ _id: noteID });
      res.send({ msg: "Note deleted successfully" });
    } else {
      res.send({ msg: "Note Authorized" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = { notesRouter };
