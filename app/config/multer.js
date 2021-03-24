const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const storage = multer.memoryStorage();

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

module.exports = uploadFile;
