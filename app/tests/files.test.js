const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../index");
const db = require("../models");

chai.use(chaiHttp);

const filesUrl = "/api/v1/files";

describe("Files route", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    await db.File.create({
      type: "",
      name: "test.pdf",
      data: "",
    });
    await db.File.create({
      type: "",
      name: "test.txt",
      data: "",
    });
  });
  afterEach(async () => {
    sinon.restore();
    await db.File.drop();
  });

  it("should upload a new file", async () => {
    const fileName = "test.txt";

    try {
      const response = await chai
        .request(app)
        .post(`${filesUrl}/upload`)
        .field("Content-Type", "multipart/form-data")
        .field("name", "testFilee")
        .attach("file", fs.readFileSync(`${__dirname}/${fileName}`), fileName);

      const { message, files } = response.body;

      expect(response.status).to.equal(200);
      expect(message).to.be.eq(`Uploaded the file successfully: ${fileName}`);
      expect(files.length).to.be.eq(3);
    } catch (error) {
      console.log(error, "errrr");
      throw new Error("error");
    }
  });

  it("should throw error if file name is undefined", async () => {
    try {
      const response = await chai
        .request(app)
        .post(`${filesUrl}/upload`)
        .field("Content-Type", "multipart/form-data");

      const { message } = response.body;

      expect(response.status).to.equal(400);
      expect(message).to.be.eq(`Please upload a file!`);
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should get all the files", async () => {
    try {
      const response = await chai.request(app).get(filesUrl);
      const { files } = await response.body;
      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
      expect(files).be.a("array");
      expect(files).to.have.length(2);

      const file = files[0];
      file.should.have.property("fileId");
      file.should.have.property("type");
      file.should.have.property("name");
      file.should.have.property("data");
      response.body.should.have.property("success").eq(true);
    } catch (error) {
      throw new Error("error");
    }
  });
  it("should received error on fail", async () => {
    const mError = new Error("stub: Internal server error");
    const query = sinon.stub(db.File, "findAll").rejects(mError);

    try {
      const response = await chai.request(app).get("/api/v1/files");
      sinon.assert.calledWith(query, { raw: true });
      console.log(response.body, "response.status");
      expect(response.status).to.equal(400);
      response.body.should.have.property("success").eq(false);
    } catch (error) {
      throw error;
    }
    sinon.restore();
  });

  it("should get a single file record", async () => {
    const id = 1;
    try {
      const response = await chai.request(app).get(`${filesUrl}/${id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");
    } catch (error) {
      throw new Error("error");
    }
  });

  it("it should delete a file after a specific id", async () => {
    const id = 1;
    try {
      const response = await chai.request(app).delete(`${filesUrl}/${id}`);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.a("object");

      const responseUser = await chai.request(app).get(`${filesUrl}/${id}`);
      expect(responseUser.status).to.equal(401);
    } catch (error) {
      throw new Error("error");
    }
  });
});
