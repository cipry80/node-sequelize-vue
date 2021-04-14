"use strict";

const bcrypt = require("bcrypt");

const config = require("../config");
const SECRET = config.SUPER_SECRET;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("pass123", salt);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "name",
          password: hashedPassword,
          age: 23,
          sex: "male",
          email: "email@email.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "name2",
          password: hashedPassword,
          age: 23,
          sex: "female",
          email: "email2@email.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
