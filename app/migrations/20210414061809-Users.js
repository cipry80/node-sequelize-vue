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
        validate: { notEmpty: true },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { notEmpty: true, min: 18 },
      },
      gender: { type: Sequelize.ENUM, values: ["male", "female"] },
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
