const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index");
const db = require("../models");

chai.use(chaiHttp);

// db.sequelize.sync({ force: true }).then(function () {
//   done();
// });

describe("Users route", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.User.create({
      username: "name",
      password: "pass22",
      age: 23,
      sex: "male",
      email: "email@email.com",
    });
    await db.User.create({
      username: "name2",
      password: "pass22",
      age: 28,
      sex: "female",
      email: "email@email2.com",
    });
  });
  afterEach(async () => {
    //await db.User.drop();
  });

  it("should not register new user if the username exist", async () => {
    const user = {
      username: "name",
      password: "pass22",
      age: 23,
      sex: "male",
      email: "email@email.com",
    };

    try {
      const response = await chai
        .request(app)
        .post("/api/v1/users/register")
        .send(user);
      const { error } = await JSON.parse(response.error.text);
      expect(response.status).to.equal(412);
      expect(error).to.equal("existing_user");
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should get all the users on success", async () => {
    try {
      const response = await chai.request(app).get("/api/v1/users");
      const { users } = await response.body;

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
      expect(users).be.a("array");
      expect(users).to.have.length(2);

      const user = users[0];
      user.should.have.property("userId");
      user.should.have.property("username");
      user.should.have.property("email");
      user.should.have.property("age");
      user.should.have.property("sex");
      response.body.should.have.property("success").eq(true);
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should received error on fail", async () => {
    try {
      const response = await chai.request(app).get("/api/v1/userss");
      const { users } = await response.body;

      expect(response.status).to.equal(404);
      expect(response.body).to.be.a("object");
      response.body.should.have.property("success").eq(false);
    } catch (error) {
      throw new Error("error");
    }
  });
});
