const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const bcrypt = require("bcrypt");

const chaiHttp = require("chai-http");
const app = require("../index");
const db = require("../models");

chai.use(chaiHttp);

const usersUrl = "/api/v1/users";

describe("Users route", () => {
  beforeEach(async () => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("pass123", salt);

    await db.sequelize.sync({ force: true });
    await db.User.create({
      username: "name",
      password: hashedPassword,
      age: 23,
      sex: "male",
      email: "email@email.com",
    });
    await db.User.create({
      username: "name2",
      password: hashedPassword,
      age: 28,
      sex: "female",
      email: "email@email2.com",
    });
  });
  afterEach(async () => {
    await db.User.drop();
  });

  it("should register new user ", async () => {
    const user = {
      username: "name3",
      password: "pass22",
      age: 30,
      sex: "female",
      email: "email3@email.com",
    };

    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/register`)
        .send(user);
      const { success } = await JSON.parse(response.text);

      expect(response.status).to.equal(201);
      expect(success).to.be.true;
    } catch (error) {
      throw new Error("error");
    }
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
        .post(`${usersUrl}/register`)
        .send(user);
      const { error } = await JSON.parse(response.error.text);
      expect(response.status).to.equal(412);
      expect(error).to.equal("existing_user");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should login with success ", async () => {
    const body = {
      username: "name",
      password: "pass123",
    };
    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/login`)
        .send(body);

      const { success } = await response.body;

      expect(response.status).to.equal(200);
      expect(success).to.be.true;
      expect(response.body).to.have.property("token");
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should get all the users on success", async () => {
    try {
      const response = await chai.request(app).get(usersUrl);
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
    const wrongUrl = "/api/v1/userss";
    try {
      const response = await chai.request(app).get(wrongUrl);

      expect(response.status).to.equal(404);
      expect(response.body).to.be.a("object");
      response.body.should.have.property("success").eq(false);
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should get a single user record", async () => {
    const id = 1;
    try {
      const response = await chai.request(app).get(`${usersUrl}/${id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("it should update a user given an id", async () => {
    const id = 1;
    try {
      const response = await chai.request(app).put(`${usersUrl}/${id}`).send({
        email: "john@email.com",
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");

      const responseUser = await chai.request(app).get(`${usersUrl}/${id}`);
      expect(responseUser.body).to.have.property("email").eql("john@email.com");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("it should delete a user after a specific id", async () => {
    const id = 1;
    try {
      const response = await chai.request(app).delete(`${usersUrl}/${id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");

      const responseUser = await chai.request(app).get(`${usersUrl}/${id}`);
      expect(responseUser.status).to.equal(401);
    } catch (error) {
      throw new Error("error");
    }
  });
});
