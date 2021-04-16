const { extractObject } = require("../utilities");
const db = require("../models");

const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a file!" });
    }

    await db.File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: req.file.buffer,
    });

    const files = await db.File.findAll({ raw: true });

    res.status(200).json({
      message: "Uploaded the file successfully: " + req.file.originalname,
      files,
    });
  } catch (error) {
    res.validationError();
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await db.File.findAll({ raw: true });
    res.status(200).json({ success: true, files });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const getFile = async (req, res) => {
  try {
    const file = await db.File.findAll({
      where: { fileId: req.params.id },
      raw: true,
    });

    if (file.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "No such file found" });
    }

    const responseObj = {
      succes: true,
      file,
    };

    res.status(200).json(responseObj);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await db.File.findAll({
      where: { fileId: req.params.id },
    });

    if (file.length === 0) {
      return res.status(401).json({ messages: "No such file found" });
    }
    await db.File.destroy({ where: { fileId: req.params.id } });
    res.status(200).json({ success: "The File was deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = { upload, getFiles, getFile, deleteFile };
