const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
router.post("/", noteController.createNote);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.updateNote);
router.delete("/:id",noteController.deleteNote);
router.get("/", noteController.getAllNote);
module.exports = router;    