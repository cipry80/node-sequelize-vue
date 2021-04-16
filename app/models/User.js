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
        unique: true,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: { msg: "Email has not a correct format, please try again" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, min: 18 },
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        validate: {
          isIn: {
            args: ["male", "female"],
            msg: "Please choose between male or female",
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
