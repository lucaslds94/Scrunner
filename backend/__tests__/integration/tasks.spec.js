const request = require("supertest");
const app = require("../../src/app");

let USER_DB = {
  id: 2,
  email: "johntravolta@test.com",
  password: "12345678",
  token: null,
};

let TASK_BOARD_TO_DELETE = {
  id: null,
  team_id: 1,
  name: "Task board to delete",
  days: "15",
};

let TASK_TO_DELETE = {
  id: null,
};

const BOARD_ID = 1;
const TEAM_ID = 1;

describe("Tasks", () => {
  beforeAll(async () => {

    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;

    const MOCK_BOARD = {
      name: "Task board to delete",
      days: "15",
    }

    const resBoard = await request(app)
      .post(`/tasks/boards/${TASK_BOARD_TO_DELETE.team_id}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(MOCK_BOARD);

    TASK_BOARD_TO_DELETE.id = resBoard.body.board.id;

    const NEW_TASK_TO_DELETE = {
      title: "New title",
      description: "No description",
      task_points: "10",
      task_column: "1",
    };

    const resContent = await request(app)
      .post(`/tasks/contents/${TEAM_ID}/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(NEW_TASK_TO_DELETE);

    TASK_TO_DELETE.id = resContent.body.content.id;
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
    const response = await request(app)
      .delete(
        `/tasks/boards/${TASK_BOARD_TO_DELETE.team_id}/${TASK_BOARD_TO_DELETE.id}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to delete a task board with an invalid id", async () => {
    const INVALID_BOARD_ID = 99999999;

    const response = await request(app)
      .delete(
        `/tasks/boards/${TASK_BOARD_TO_DELETE.teamId}/${INVALID_BOARD_ID}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to return tasks information from a board", async () => {
    

    const response = await request(app)
      .get(`/tasks/contents/${TEAM_ID}/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("tasks");
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to create a new task", async () => {
    

    const NEW_TASK = {
      title: "New title",
      description: "No description",
      task_points: "10",
      task_column: "1",
    };

    const response = await request(app)
      .post(`/tasks/contents/${TEAM_ID}/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(NEW_TASK);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to delete a task", async () => {
    

    const response = await request(app)
      .delete(`/tasks/contents/${TEAM_ID}/${BOARD_ID}/${TASK_TO_DELETE.id}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(204);
  });

  it("Should be able to delete a task", async () => {
    
    const INVALID_CONTENT_ID = 99999999999;

    const response = await request(app)
      .delete(`/tasks/contents/${TEAM_ID}/${BOARD_ID}/${INVALID_CONTENT_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to change a task column ", async () => {
    const TASK_ID = 1;
    const columnId = '2';

    const response = await request(app)
      .put(`/tasks/contents/${TEAM_ID}/${TASK_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send({columnId});

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });
});
