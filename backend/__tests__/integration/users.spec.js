const request = require("supertest");
const app = require("../../src/app");

const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlink = promisify(fs.unlink);

const MOCK_USER = {
  name: "Example",
  email: "example@email.com",
  password: "12345678",
  is_owner: true,
};

const USER_DB = {
  email: "johndoe@test.com",
  password: "12345678",
  token: null,
};

let MOCK_USER_TO_DELETE = {
  id: null,
  name: "Example",
  email: "accounttest@test.com",
  password: "12345678",
  is_owner: true,
};

describe("Users routes", () => {
  beforeAll(async () => {
    let MOCK_USER_DELETE = {
      name: "Example",
      email: "accounttest@test.com",
      password: "12345678",
      is_owner: true,
    };

    const response = await request(app).post("/user").send(MOCK_USER_DELETE);
    
    MOCK_USER_TO_DELETE.id = response.body.id;

    const responseLogin = await request(app).post("/login").send(USER_DB);

    USER_DB.token = responseLogin.body.token;
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an account when it already exists", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to disable a user", async () => {
    const response = await request(app).put(`/user/${MOCK_USER_TO_DELETE.id}`);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to find a user with an invalid ID", async () => {
    const response = await request(app).put("/user/231hk2g4k2h");

    expect(response.status).toEqual(400);
  });

  it("Should be able to update data user", async () => {
    const USER_ID = 3;

    const response = await request(app)
      .put(`/user/update/${USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .set("content-type", "multipart/form-data")
      .field("name", "New Name")
      .field("password", "123456789")
      .field("oldPassword", "12345678")
      .attach("image", path.resolve(__dirname, "..", "mock", "user.jpg"));

    await unlink(
      path.resolve(__dirname, "..", "..", "uploads", response.body.user.image)
    );

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to update data user without changing the password", async () => {
    const USER_ID = 4;

    const response = await request(app)
      .put(`/user/update/${USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .set("content-type", "multipart/form-data")
      .field("name", "New Name")
      .field("password", "")
      .field("oldPassword", "")
      .attach("image", path.resolve(__dirname, "..", "mock", "user.jpg"));

    await unlink(
      path.resolve(__dirname, "..", "..", "uploads", response.body.user.image)
    );

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });
});
