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

  it("Should be able to create a task board", async () => {
    const NEW_TASK_BOARD = {
      name: "Task Board",
      days: "15",
    };

    const response = await request(app)
      .post(`/tasks/boards/${TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(NEW_TASK_BOARD);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("board");
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to delete a task board", async () => {
    const TASK_BOARD_TO_DELETE = {
      id: 1,
      teamId: 1,
    };

    const response = await request(app)
      .delete(
        `/tasks/boards/${TASK_BOARD_TO_DELETE.teamId}/${USER_DB.id}/${TASK_BOARD_TO_DELETE.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(204);
  });
});
