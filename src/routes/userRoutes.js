const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id",userController.deleteUser);
router.get("/", userController.getAllUser);
module.exports = router;    