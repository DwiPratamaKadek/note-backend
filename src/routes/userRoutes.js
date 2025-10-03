const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/auth")

router.post("/",  userController.register);
router.post("/login", userController.login)
router.post("/logout", authenticateToken, userController.logout)

router.get("/:id",authenticateToken, userController.getUserById);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id",authenticateToken, userController.deleteUser);
router.get("/",  userController.getAllUser);

// Ilmu ni bang perbedaan , dan . (.) ini itu sama kayak anak userControler punya anak register sedangkan (,) punya sendiri authenticateToken jadi seperti memisahkan mana ibu satu dengan yang lain
// fungsi nodemon cuma buat auto restart biar gak build ulang 

module.exports = router;    