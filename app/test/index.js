const chai = require("chai");
const sinon = require("sinon");
const db = require("../models");
global.expect = chai.expect;

beforeEach(async () => {
  await db.sequelize.sync({ force: true, logging: false });
});

afterEach(async () => {
  await db.File.drop();
});

require("./users.test");
require("./files.test");
