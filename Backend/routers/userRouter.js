const express = require("express");

const userController = require("../Controllers/user");
const { route } = require("./noticeRouter");

const router = express.Router();

router.get("/users", userController.getUsers);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

module.exports = router;
