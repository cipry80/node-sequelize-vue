const express = require("express");
const router = express.Router();

const {
  getUsers,
  register,
  edit,
  getUser,
  deleteUser,
} = require("../controllers/usersController");

router.get("/", getUsers);
router.post("/", register);
router.put("/:id", edit);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

module.exports = router;
