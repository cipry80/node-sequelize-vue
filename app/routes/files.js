const express = require("express");
const cors = require("cors");
const router = express.Router();

const { getFiles, upload, getFile } = require("../controllers/fileController");
const uploadFile = require("../middlewares/uploadFile");

router.get("/", cors(), getFiles);
router.post("/upload", cors(), uploadFile, upload);
router.get("/:id", cors(), getFile);

module.exports = router;
