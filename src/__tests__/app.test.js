const request = require("supertest");
const fs = require("fs");
const app = require("../app");

console.log("Tests are started.");

describe("Operation unknown", () => {
  const opUn = "Operation unknown";
  test("/bb status 400 & Operation unknown", async () => {
    const resp = await request(app).get("/bb");

    expect(resp.status).toEqual(400);
    expect(resp.text).toEqual(opUn);
  });
});

describe("Calculator", () => {
  const path = "/calc";

  test("/calc add 3 55", async () => {
    const resp = await request(app).get(path).query({
      operation: "add",
      a: 3,
      b: 55,
    });

    expect(resp.status).toEqual(200);
    expect(resp.text).toEqual("58");
  });

  test("/calc sub 32 5", async () => {
    const resp = await request(app).get(path).query({
      operation: "sub",
      a: 32,
      b: 5,
    });

    expect(resp.status).toEqual(200);
    expect(resp.text).toEqual("27");
  });

  test("/calc mul 4 51", async () => {
    const resp = await request(app).get(path).query({
      operation: "mul",
      a: 4,
      b: 51,
    });

    expect(resp.status).toEqual(200);
    expect(resp.text).toEqual("204");
  });

  test("/calc div 14 7", async () => {
    const resp = await request(app).get(path).query({
      operation: "div",
      a: 14,
      b: 7,
    });

    expect(resp.status).toEqual(200);
    expect(resp.text).toEqual("2");
  });
});

describe("File System", () => {
  const path = "/fs";
  const fileName = "tf988.txt"
  test(`/fs create ${fileName} smart inside`, async () => {
    const resp = await request(app).get(path).query({
      operation: "create",
      filename: fileName,
      text: "smart inside",
    });

    expect(resp.status).toEqual(201);
    expect(resp.text).toEqual(`${fileName} was created`);
    fs.unlinkSync(fileName);
  });

  test("/fs read tf989.txt", async () => {
    const fileName = "tf989.txt";
    const text = "---------____------------_____----";
    await new Promise((resolve, reject) => {
      fs.writeFile(fileName, text, async () => {
        let resp = {};
        try {
          resp = await request(app).get(path).query({
            operation: "read",
            filename: fileName,
          });
        } catch (e) {
          fs.unlinkSync(fileName);
          reject(e);
          return;
        }
        expect(resp.status).toEqual(201);
        expect(resp.text).toEqual(text);
        resolve();
      });
    });
    fs.unlinkSync(fileName);
  });
});
