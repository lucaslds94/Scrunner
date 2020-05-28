const request = require("supertest");
const app = require("../../src/app");

let USER_DB = {
  id: 2,
  email: "johntravolta@test.com",
  password: "12345678",
  token: null,
};

const TEAM_ID = 1;

describe("Dashboard", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;
  });

  it("Should be able to return the daily board info", async () => {
    const response = await request(app)
      .get(`/dailys/boards/${TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("boards");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to return the daily board info of an invalid user", async () => {
    const INVALID_USER_ID = 58547;

    const response = await request(app)
      .get(`/dailys/boards/${TEAM_ID}/${INVALID_USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to return the daily board info of an invalid team", async () => {
    const INVALID_TEAM_ID = 58547;

    const response = await request(app)
      .get(`/dailys/boards/${INVALID_TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to return the daily board info of a team that the user is not member", async () => {
    const INVALID_USER = 3;
    const INVALID_TEAM_MEMBER = 2;

    const response = await request(app)
      .get(`/dailys/boards/${INVALID_TEAM_MEMBER}/${INVALID_USER}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to create a daily board", async () => {
    const response = await request(app)
      .post(`/dailys/boards/${TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("board");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to create a daily board if the user is not leader", async () => {
    const UNAUTHORIZED_USER_ID = 3;

    const response = await request(app)
      .post(`/dailys/boards/${TEAM_ID}/${UNAUTHORIZED_USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });
});
