const request = require("supertest");
const app = require("../../src/app");

const MOCK_USER = {
  name: "Lucas",
  email: "lucas@santander.com",
  password: "123456",
  is_owner: "T",
};

let ID_MOCK_USER = "";

describe("Route Users", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    ID_MOCK_USER = response.body.id;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an account when it already exists", async () => {
    const response = await request(app).post("/user").send(MOCK_USER);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("error");
  });

  it("Should be able to delete a user", async () => {
    const response = await request(app).delete(`/user/${ID_MOCK_USER}`);

    expect(response.status).toEqual(204);
  }); 

  it("Should not be able to find a user with an invalid ID", async () => {
    const response = await request(app).delete("/user/231hk2g4k2h");

    expect(response.status).toEqual(409);
  });


});
