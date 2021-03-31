const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from routes");
});

router.get(
  "/protected",
  passport.authenticate("custom-strategy", { session: false }),
  (req, res) => {
    res.send("Hello from protected routes");
  }
);

module.exports = router;
