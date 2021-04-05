const multer = require("multer");
const { fileFilter } = require("../utilities");
const maxSize = 2 * 1024 * 1024;

let storage = multer.memoryStorage();

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    const ext = [".txt", ".pdf", ".csv", ".xls"];
    const name = file.originalname;

    if (!ext.some((el) => name.endsWith(el))) {
      const error = new Error("Wrong file type");
      error.code = "FILE_TYPES_NOT_SUPPORTED";
      return cb(error, false);
    }
    cb(null, true);
  },
}).single("file");

module.exports = uploadFile;
