"use strict";
const fs = require("fs");
const path = require("path");
const filepath = path.resolve(__dirname, "../test/test.txt");
const file = Buffer.from(fs.readFileSync(filepath));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Files",
      [
        {
          type: "",
          name: "test.pdf",
          data: file,
        },
        {
          type: "",
          name: "test2.pdf",
          data: file,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Files", null, {});
  },
};
