// const bcrypt = require( "bcrypt" );

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
        },
        unique: { args: true, msg: "Username must be unique" },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
          isEmail: { msg: "Email has not a correct format, please try again" },
        },
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
          min: 18,
        },
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        validate: {
          isIn: {
            args: [["male", "female"]],
            msg: "Please choose between male or female",
          },
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
