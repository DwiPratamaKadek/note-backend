const express = require("express");
const router = express.Router();
const noteController = require("../controller/noteController");
const authenticateToken = require("../middleware/auth")

router.post("/", authenticateToken, noteController.createNote);

router.put("/:id", authenticateToken,noteController.updateNote);

router.delete("/:id",authenticateToken,noteController.deleteNote);

router.get("/", authenticateToken,noteController.getAllNote);
router.get("/user", authenticateToken,noteController.getNotebyUser);
router.get("/:id", authenticateToken,noteController.getNotebyId);
module.exports = router;    