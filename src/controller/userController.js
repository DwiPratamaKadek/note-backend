const UserModel = require("../model/userModel");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await UserModel.getAll();
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting all user:", error);
      res.status(500).json({ message: "Error getting all user" });
    }
  },

  createUser: async (req, res) => {
    const { username, email, password } =
      req.body;
    try {
      const userId = await UserModel.create(
        username,
        email, 
        password
      );
      res
        .status(201)
        .json({ message: "User created successfully", userId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ message: "Error getting user" });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const affectedRows = await UserModel.update(
        username, 
        email, 
        password,
        id
      );
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
      const affectedRows = await UserModel.delete(id);
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