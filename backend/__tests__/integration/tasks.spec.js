const request = require("supertest");
const app = require("../../src/app");

let USER_DB = {
  id: 2,
  email: "johntravolta@test.com",
  password: "12345678",
  token: null,
};

const TEAM_ID = 1;

describe("Tasks", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;
  });

  
  it("Should be able to return the task board information", async () => {
    const response = await request(app)
      .get(`/tasks/boards/${TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("boards");
    expect(response.body).toHaveProperty("token");
  });
});
