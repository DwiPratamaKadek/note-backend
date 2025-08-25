const NoteModel = require("../model/noteModel");

const noteController = {
  getAllNote: async (req, res) => {
    try {
      const note = await NoteModel.getAll();
      res.status(200).json(note);
    } catch (error) {
      console.error("Error getting all note:", error);
      res.status(500).json({ message: "Error getting all note" });
    }
  },

  createNote: async (req, res) => {
    const { title, content, deadline, id_user, id_priority } =
      req.body;
    try {
      const noteId = await NoteModel.create(
        title,
        content,
        deadline,
        id_user,
        id_priority
      );
      res
        .status(201)
        .json({ message: "Note created successfully", noteId });
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ message: "Error creating note" });
    }
  },

  getNoteById: async (req, res) => {
    const { id } = req.params;
    try {
      const note = await NoteModel.findById(id);
      if (!note) {
        return res.status(404).json({ message: "note not found" });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error("Error getting note by ID:", error);
      res.status(500).json({ message: "Error getting note" });
    }
  },

  updateNote: async (req, res) => {
    const { id } = req.params;
    const { title, content, deadline, id_user, id_priority } = req.body;
    try {
      const affectedRows = await NoteModel.update(
        title, 
        content, 
        deadline, 
        id_user, 
        id_priority,
        id
      );
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Note not found or no changes made" });
      }
      res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Error updating note" });
    }
  },

  deleteNote: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await NoteModel.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ message: "Error deleting note" });
    }
  },

};

module.exports = noteController;