const { extractObject, generateToken } = require("../utilities");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config");
const SECRET = config.SUPER_SECRET;

const db = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json({ succes: true, ...users });
  } catch (error) {
    res.status(404).json({ succes: false, error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: { userId: req.params.id },
    });

    if (user.length === 0) {
      return res.status(401).json({ messages: "No such user found" });
    }

    const responseObj = {
      succes: true,
      ...extractObject(user[0], ["userId", "username"]),
    };
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, age, sex, email } = req.body;

    const user = await db.User.findAll({
      where: { username },
    });

    console.log(user, "user");

    if (user.length > 0) {
      res.preconditionFailed("existing_user");
      return;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.User.create({
      username,
      password: hashedPassword,
      age,
      sex,
      email,
    });

    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ succes: false, error: error.message });
  }
};

const login = async (req, res) => {
  if (!req.body.password) {
    return res.status(400).send("password required");
  }

  const user = await db.User.findAll({
    where: { username: req.body.username },
  });

  if (user.length === 0) {
    return res.status(404).json({ messages: "No such user found" });
  }

  const { userId, username, password, email } = user[0];

  try {
    const matchPassword = bcrypt.compareSync(req.body.password, password);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }

    const expiresIn = "1d";
    const payload = {
      id: userId,
      username,
      email,
      iat: Date.now(),
    };

    const token = await generateToken(payload, SECRET, jwt, expiresIn);

    res.status(200).json({
      success: true,
      token,
      expiresIn,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

const edit = async (req, res) => {
  try {
    const email = await req.body.email;
    const id = await req.params.id;

    const user = await db.User.findAll({
      where: { userId: req.params.id },
    });

    if (user.length === 0) {
      return res.status(401).json({ messages: "No such user found" });
    }

    await db.User.update({ email }, { where: { userId: id } });
    res.status(200).json({ message: "User updated with succes" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: { userId: req.params.id },
    });

    if (user.length === 0) {
      return res.status(401).json({ messages: "No such user found" });
    }
    await db.User.destroy({ where: { userId: req.params.id } });
    res.status(200).json({ succes: "The user was deleted" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

module.exports = { getUsers, getUser, register, login, edit, deleteUser };
