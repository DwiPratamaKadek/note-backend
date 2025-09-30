const { where } = require("sequelize");
const { priority } = require("../models");

const priorityController = {
  getAllPriority: async (req, res) => {
    try {
      const data = await priority.findAll();
      if( data === 0 ) {
        return res.status(404).json({ message: "Priority not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting all user:", error);
      res.status(500).json({ message: "Error getting all user" });
    }
  },

  createPriority: async (req, res) => {
    const { name, level, color } = req.body;
    try {
      const dataPrio = await priority.create({
        name,
        level, 
        color
      });
      res.status(201).json({ message: "Priority created successfully", dataPrio });
    } catch (error) {
      console.error("Error creating priority:", error);
      res.status(500).json({ message: "Error creating priority" });
    }
  },

  getPriorityById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataPrio = await priority.findByPk(id);
      if (!dataPrio ) {
        return res.status(404).json({ message: "priority not found" });
      }
      res.status(200).json(dataPrio);
    } catch (error) {
      console.error("Error getting priority by ID:", error);
      res.status(500).json({ message: "Error getting priority" });  
    }
  },

  updatePriority: async (req, res) => {
    const { id } = req.params;
    const { name, level, color } = req.body;
    try {
      const affectedRows = await priority.update({
        name, 
        level,
        color,
      }, {where : { id_priority : id} });
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Priority not found or no changes made", dataPrio });
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
      const affectedRows = await priority.destroy({where : { id_priority : id}});
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