const uploadFile = require("../config/multer");
const db = require("../models");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    await db.File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: req.file.buffer,
    });

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await db.File.findAll();
    const responseObj = {
      succes: true,
      ...files,
    };
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

const getFile = async (req, res) => {
  try {
    await db.File.findAll({
      where: { fileId: req.params.id },
    });
    // const responseObj = {
    //   succes: true,
    //   ...extractObject(file[0], ["fileId", "name"]),
    // };
    res.status(200).json(success);
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

module.exports = { upload, getFiles, getFile };
