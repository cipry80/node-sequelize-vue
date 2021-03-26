const express = require("express");
const router = express.Router();

const {
  getUsers,
  register,
  login,
  edit,
  getUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", edit);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
