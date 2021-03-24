const express = require("express");
const router = express.Router();
const db = require("../models");

const usersController = require("../controllers/usersController");

router.get("/", usersController.getUsers);

router.post("/", usersController.register);

router.put("/:id", usersController.edit);

router.get("/:id", usersController.getUser);

router.delete("/:id", usersController.delete);

module.exports = router;
