const express = require("express");
const router = express.Router();

const { getFiles, upload, getFile } = require("../controllers/fileController");
const uploadFile = require("../middlewares/uploadFile");

router.get("/", getFiles);
router.post("/upload", uploadFile, upload);
router.get("/:id", getFile);

module.exports = router;
