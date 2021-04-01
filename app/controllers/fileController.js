const { extractObject } = require("../utilities");
const db = require("../models");

const upload = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({ message: "Please upload a file!" });
    }

    await db.File.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: req.file.buffer,
    });

    res.status(200).json({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "File size cannot be larger than 2MB!",
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await db.File.findAll({ raw: true });

    res.status(200).json({ succes: true, files });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

const getFile = async (req, res) => {
  try {
    const file = await db.File.findAll({
      where: { fileId: req.params.id },
    });

    if (file.length === 0) {
      return res.status(401).json({ messages: "No such file found" });
    }

    const responseObj = {
      succes: true,
      ...extractObject(file[0], ["fileId", "name"]),
    };

    res.status(200).json(responseObj);
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

module.exports = { upload, getFiles, getFile };
