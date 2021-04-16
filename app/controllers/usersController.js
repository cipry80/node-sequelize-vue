const { extractObject, generateToken } = require("../utilities");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config");
const SECRET = config.JWT_SECRET;

const db = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({ raw: true });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: { userId: req.params.id },
      raw: true,
    });

    if (user.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "No such user found" });
    }

    const responseObj = {
      success: true,
      ...extractObject(user[0], ["userId", "username", "email"]),
    };
    res.status(200).json(responseObj);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email, age, gender } = req.body;
    console.log(req.body, "body");
    const user = await db.User.findAll({
      where: { username },
    });

    const emailResponse = await db.User.findAll({
      where: { email },
    });

    if (user.length > 0) {
      return res.preconditionFailed("existing_user");
    }

    if (emailResponse.length > 0) {
      return res.preconditionFailed("existing_email");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(gender);
    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      age,
      gender,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "User created with success",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  if (!req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: "password required" });
  }

  const user = await db.User.findAll({
    where: { username: req.body.username },
  });

  if (user.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No such user found" });
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
      return res
        .status(401)
        .json({ success: false, message: "No such user found" });
    }

    await db.User.update({ email }, { where: { userId: id } });
    res
      .status(200)
      .json({ success: true, message: "User updated with succes", user });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      where: { userId: req.params.id },
    });

    if (user.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "No such user found" });
    }
    await db.User.destroy({ where: { userId: req.params.id } });
    res.status(200).json({ success: true, message: "The user was deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

module.exports = { getUsers, getUser, register, login, edit, deleteUser };
