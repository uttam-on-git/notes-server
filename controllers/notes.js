import express from "express";
const notesRouter = express.Router();
import Note from "../models/note.js";
import User from "../models/user.js";

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate("user", { name: 1, username: 1 });
  response.json(notes);
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(body.userId);
  if (!body) {
    return response.status(400).json({ content: "Content is missing." });
  }
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id,
  });
  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.delete("/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => {
      next(error);
    });
});

export default notesRouter;
