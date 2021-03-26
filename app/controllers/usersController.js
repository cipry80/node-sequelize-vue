const { extractObject } = require("../utilities");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config");
const SECRET = config.SUPER_SECRET;

const db = require("../models");

const getUsers = async (req, res) => {
  // let { user } = req;
  // if ( user ) {
  //     res.preconditionFailed( "existing_user" );
  //     return;
  // }
  // user = new User( req.body );
  // user.setPass( req.body.password );
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.User.create({
      username,
      password: hashedPassword,
      age,
      sex,
      email,
    });
    res.status(201).json({ succes: true, ...newUser });
  } catch (error) {
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

  const dbPassword = user[0].password;
  // const userId = user[0].userId;
  // const username = user[0].username;
  const { userId, username, password, email } = user[0];

  try {
    const matchPassword = await bcrypt.compareSync(req.body.password, password);

    if (!matchPassword) {
      return res.json({
        success: false,
        message: "Authentication failed. Wrong password.",
      });
    }

    const token = jwt.sign({ userId, username, email }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Authentication failed. User not found.",
    });
  }
};

const edit = async (req, res) => {
  try {
    const email = await req.body.email;
    const id = await req.params.id;

    await db.User.update({ email }, { where: { userId: id } });
    res.status(200).json({ message: "User updated with succes" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

const deleteUser = async (req, res) => {
  try {
    await db.User.destroy({ where: { userId: req.params.id } });
    res.status(204).json({ succes: "The user was deleted" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

module.exports = { getUsers, getUser, register, login, edit, deleteUser };
