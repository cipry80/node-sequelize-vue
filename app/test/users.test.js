const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index");
chai.use(chaiHttp);

const usersUrl = "/api/v1/users";

describe("Users route", () => {
  it("should register new user ", async () => {
    const user = {
      username: "name3",
      password: "hashedPassword",
      age: 30,
      gender: "female",
      email: "email3@email.com",
    };
    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/register`)
        .send(user);

      expect(response.status).to.equal(201);
      expect(response.body).to.be.true;
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should not register new user if the username exists", async () => {
    const user = {
      username: "name",
      password: "hashedPassword",
      age: 23,
      gender: "male",
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
      username: "name3",
      password: "hashedPassword",
    };

    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/login`)
        .send(body);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.true;
      expect(response.body).to.have.property("token");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should not logged in if password is missing", async () => {
    const body = {
      username: "name3",
    };

    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/login`)
        .send(body);

      expect(response.status).to.equal(400);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body).to.have.property("message").eq("password required");
    } catch (error) {
      console.log(error, "errrrrr");
      throw new Error("error");
    }
  });

  it("should not logged in if user not exist", async () => {
    const body = {
      username: "name4",
      password: "pass123",
    };

    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/login`)
        .send(body);

      expect(response.status).to.equal(404);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body)
        .to.have.property("message")
        .eq("No such user found");
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should not logged in if password in wrong", async () => {
    const body = {
      username: "name3",
      password: "bad",
    };

    try {
      const response = await chai
        .request(app)
        .post(`${usersUrl}/login`)
        .send(body);

      expect(response.status).to.equal(401);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body)
        .to.have.property("message")
        .eq("Authentication failed. Wrong password.");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should get all the users", async () => {
    try {
      const response = await chai.request(app).get(usersUrl);
      const { users } = await response.body;
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
      expect(users).be.a("array");
      expect(users).to.have.length(3);

      const user = await users[0];

      expect(user).to.have.property("userId");
      expect(user).to.have.property("username");
      expect(user).to.have.property("email");
      expect(user).to.have.property("age");
      expect(user).to.have.property("gender");
      expect(response.body).to.have.property("success").eq(true);
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should receive 404 error with wrong url", async () => {
    const wrongUrl = "/api/v1/userss";
    try {
      const response = await chai.request(app).get(wrongUrl);
      expect(response.status).to.equal(404);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should get a single user record", async () => {
    const id = 3;
    try {
      const response = await chai.request(app).get(`${usersUrl}/${id}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should update a user given an id", async () => {
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
  it("it should delete a user given an id", async () => {
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

  it("should get receive 401 if no user record", async () => {
    const id = 5;
    try {
      const response = await chai.request(app).get(`${usersUrl}/${id}`);
      expect(response.status).to.equal(401);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body)
        .to.have.property("message")
        .eq("No such user found");
    } catch (error) {
      throw new Error("error");
    }
  });
});
