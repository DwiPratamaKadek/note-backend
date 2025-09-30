// const UserModel = require("../model/userModel");

const { user } = require("../models")

const userController = {
  getAllUser: async (req, res) => {
    try {
      const data = await user.findAll();
      if(!data) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting all user:", error);
      res.status(500).json({ message: "Error getting all user" });
    }
  },

  createUser: async (req, res) => {
    const { username, email, password } =
      req.body;
    try {
      const userData = await user.create({
        username,
        email, 
        password
      });
      res
        .status(201)
        .json({ message: "User created successfully", userData });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const userData = await user.findByPk(id);
      if ( !userData ) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(userData);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ message: "Error getting user" });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const affectedRows = await user.update({
        username, 
        email, 
        password,
       }, { where : { id_user:id } });
      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Error updating note" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await user.destroy({where : {id_user:id}});
      if (affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },

};

module.exports = userController;