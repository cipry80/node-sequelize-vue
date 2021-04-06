const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../index");
const db = require("../models");

chai.use(chaiHttp);

describe("Users route", () => {
  it("should get all the users on success", (done) => {
    chai
      .request(app)
      .get("/api/v1/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        const user = res.body.users[0];
        res.body.users.should.be.a("array");
        user.should.have.property("userId");
        user.should.have.property("username");
        user.should.have.property("email");
        user.should.have.property("age");
        user.should.have.property("sex");
        res.body.should.have.property("success").eq(true);
        done();
      });
  });
  it("should received error on fail", (done) => {
    chai
      .request(app)
      .get("/api/v1/userss")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eq(false);
        done();
      });
  });
});
