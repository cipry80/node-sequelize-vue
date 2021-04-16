const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../index");

chai.use(chaiHttp);

const filesUrl = "/api/v1/files";

describe("Files route", () => {
  it("should upload a new file", async () => {
    const fileName = "test.txt";

    try {
      const response = await chai
        .request(app)
        .post(`${filesUrl}/upload`)
        .field("Content-Type", "multipart/form-data")
        .field("name", "testFile")
        .attach("file", fs.readFileSync(`${__dirname}/${fileName}`), fileName);
      const { message, files } = response.body;

      expect(response.status).to.equal(200);
      expect(message).to.be.eq(`Uploaded the file successfully: ${fileName}`);
      expect(files.length).to.be.eq(3);
    } catch (error) {
      throw new Error("error");
    }
  });

  it("should upload a new file", async () => {
    try {
      const response = await chai
        .request(app)
        .post(`${filesUrl}/upload`)
        .field("Content-Type", "multipart/form-data")
        .field("name", "testFile");
      expect(response.status).to.equal(400);
      expect(response.body.message).to.be.eq("Please upload a file!");
    } catch (error) {
      console.log(error);

      throw new Error("error");
    }
  });

  it("should throw error if file name is undefined", async () => {
    try {
      const response = await chai
        .request(app)
        .post(`${filesUrl}/upload`)
        .field("Content-Type", "multipart/form-data");

      expect(response.status).to.equal(400);

      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body)
        .to.have.property("message")
        .eq("Please upload a file!");
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
      expect(files).to.have.length(3);

      const file = files[0];
      expect(file).to.have.property("fileId");
      expect(file).to.have.property("type");
      expect(file).to.have.property("name");
      expect(file).to.have.property("data");
      expect(response.body).to.have.property("success").eq(true);
    } catch (error) {
      throw new Error("error");
    }
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

  it("should get receive 401 if no file record", async () => {
    const id = 5;
    try {
      const response = await chai.request(app).get(`${filesUrl}/${id}`);

      expect(response.status).to.equal(401);
      expect(response.body).to.be.a("object");
      expect(response.body).to.have.property("success").eq(false);
      expect(response.body)
        .to.have.property("message")
        .eq("No such file found");
    } catch (error) {
      throw new Error("error");
    }
  });
});
