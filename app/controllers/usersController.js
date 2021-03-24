// const mongoose = require( "mongoose" );
const { extractObject } = require("../utilities");
// const jwt = require( "jsonwebtoken" );
// const bcrypt = require( "bcrypt" );

// const User = mongoose.model( "User" );
// const SECRET = "superSuperSecret";

const db = require("../models");

exports.getUsers = async (req, res) => {
  // let { user } = req;
  // if ( user ) {
  //     res.preconditionFailed( "existing_user" );
  //     return;
  // }
  // user = new User( req.body );
  // user.setPass( req.body.password );
  try {
    const users = await db.User.findAll();
    const responseObj = users;

    // console.log(responseObj, "responseObj", ...users);
    res.status(200).json({ succes: true, ...users });
  } catch (error) {
    res.status(404).json({ succes: false, error: error.message });
  }

  //     if ( err ) {
  //         return res.validationError( err );
  //     }

  // } );
};

exports.getUser = async (req, res) => {
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

exports.register = async (req, res) => {
  try {
    const { username, password, age, sex, email } = req.body;
    const newUser = await db.User.create({
      username,
      password,
      age,
      sex,
      email,
    });
    res.status(201).json({ succes: true, ...newUser });
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message });
  }
};

// exports.login = ( req, res ) => {
//     const { user } = req;
//     if ( !req.body.password ) {
//         return res.status( 400 ).send( "password required" );
//     }

//     const password = bcrypt.compareSync( req.body.password, user.password );
//     if ( user ) {
//         if ( user.password !== password ) {
//             return res.json( {
//                 success: false,
//                 message: "Authentication failed. Wrong password.",
//             } );
//         }

//         const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
//         return res.json( {
//             success: true,
//             token,
//         } );
//     }
//     return res.json( {
//         success: false,
//         message: "Authentication failed. User not found.",
//     } );
// };

exports.edit = async (req, res) => {
  try {
    const email = await req.body.email;
    const id = await req.params.id;

    await db.User.update({ email }, { where: { userId: id } });
    res.status(200).json({ message: "User updated with succes" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.User.destroy({ where: { userId: req.params.id } });
    res.status(204).json({ succes: "The user was deleted" });
  } catch (error) {
    res.status(400).json({ succes: false, error });
  }
};
