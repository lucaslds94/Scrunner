const request = require("supertest");
const app = require("../../src/app");

const MOCK_USER = {
  name: "Example",
  email: "example@email.com",
  password: "12345678",
  is_owner: 1,
};

let ID_MOCK_USER = "";

let USER_DB = {
  id: 1,
  email: "johndoe@test.com",
  password: "12345678",
  token: null,
};

describe("Users routes", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    ID_MOCK_USER = response.body.id;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an account when it already exists", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to disable a user", async () => {
    const response = await request(app).put(`/user/${ID_MOCK_USER}`);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to find a user with an invalid ID", async () => {
    const response = await request(app).put("/user/231hk2g4k2h");

    expect(response.status).toEqual(400);
  });
});



