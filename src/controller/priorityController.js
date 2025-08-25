const PriorityModel = require("../model/priorityModel");

const priorityController = {
  getAllPriority: async (req, res) => {
    try {
      const note = await PriorityModel.getAll();
      res.status(200).json(note);
    } catch (error) {
      console.error("Error getting all user:", error);
      res.status(500).json({ message: "Error getting all user" });
    }
  },

  createPriority: async (req, res) => {
    const { name, level, color } =
      req.body;
    try {
      const priorityId = await PriorityModel.create(
        name,
        level, 
        color
      );
      res
        .status(201)
        .json({ message: "Priority created successfully", priorityId });
    } catch (error) {
      console.error("Error creating priority:", error);
      res.status(500).json({ message: "Error creating priority" });
    }
  },

  getPriorityById: async (req, res) => {
    const { id } = req.params;
    try {
      const priority = await PriorityModel.findById(id);
      if (!priority) {
        return res.status(404).json({ message: "priority not found" });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error("Error getting priority by ID:", error);
      res.status(500).json({ message: "Error getting priority" });
    }
  },

  updatePriority: async (req, res) => {
    const { id } = req.params;
    const { name, level, color } = req.body;
    try {
      const affectedRows = await PriorityModel.update(
        name, 
        level,
        color,
        id
      );
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Priority not found or no changes made" });
      }
      res.status(200).json({ message: "Priority updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Error updating note" });
    }
  },

  deletePriority: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await PriorityModel.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Priority not found" });
      }
      res.status(200).json({ message: "Priority deleted successfully" });
    } catch (error) {
      console.error("Error deleting priority:", error);
      res.status(500).json({ message: "Error deleting priority" });
    }
  },

};

module.exports = priorityController;