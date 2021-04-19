"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Field cannot be empty",
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.ENUM("male", "female"),
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Users");
  },
};
