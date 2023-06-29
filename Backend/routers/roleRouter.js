const express = require("express");

const roleController = require("../Controllers/role");

const router = express.Router();

router.post("/role", roleController.createRole);

router.get("/roles", roleController.getRoles);

module.exports = router;
