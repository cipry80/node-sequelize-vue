"use strict";

const bcrypt = require("bcrypt");

const config = require("../config");
const SECRET = config.JWT_SECRET;

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
        },
        {
          username: "name2",
          password: hashedPassword,
          age: 23,
          sex: "female",
          email: "email2@email.com",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
