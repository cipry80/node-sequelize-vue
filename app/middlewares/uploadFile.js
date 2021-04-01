const multer = require("multer");
const { fileFilter } = require("../utilities");
const maxSize = 2 * 1024 * 1024;

let storage = multer.memoryStorage();

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter,
}).single("file");

module.exports = uploadFile;
