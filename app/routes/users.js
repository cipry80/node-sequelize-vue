const express = require("express");
const cors = require("cors");
const router = express.Router();

const {
  getUsers,
  register,
  login,
  edit,
  getUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", cors(), getUsers);
router.post("/register", cors(), register);
router.post("/login", cors(), login);
router.put("/:id", cors(), edit);
router.get("/:id", cors(), getUser);
router.delete("/:id", cors(), deleteUser);

module.exports = router;
