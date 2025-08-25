const express = require("express");
const router = express.Router();
const priorityController = require("../controller/priorityController");
router.post("/", priorityController.createPriority);
router.get("/:id", priorityController.getPriorityById);
router.put("/:id", priorityController.updatePriority);
router.delete("/:id",priorityController.deletePriority);
router.get("/", priorityController.getAllPriority);
module.exports = router;    