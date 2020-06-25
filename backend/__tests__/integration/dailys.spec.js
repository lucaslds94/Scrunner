const request = require("supertest");
const app = require("../../src/app");

let USER_DB = {
  id: 2,
  email: "johntravolta@test.com",
  password: "12345678",
  token: null,
};

const TEAM_ID = 1;

let USER_DB_OTHER_TEAM = {
  id: 7,
  email: "waltinho@test.com",
  password: "12345678",
};

const OTHER_TEAM_ID = 2;

let ID_BOARD_TO_DELETE = null;

const DAILY_CONTENT_TO_DELETE = 1;

describe("Dashboard", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;

    const createBoard = await request(app)
      .post(`/dailys/boards/${OTHER_TEAM_ID}/${USER_DB_OTHER_TEAM.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    ID_BOARD_TO_DELETE = createBoard.body.board.id;
  });

  it("Should be able to return the daily board information", async () => {
    const response = await request(app)
      .get(`/dailys/boards/${TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("boards");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to return the daily board information of an invalid user", async () => {
    const INVALID_USER_ID = 58547;

    const response = await request(app)
      .get(`/dailys/boards/${TEAM_ID}/${INVALID_USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to return the daily board information of an invalid team", async () => {
    const INVALID_TEAM_ID = 58547;

    const response = await request(app)
      .get(`/dailys/boards/${INVALID_TEAM_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to return the daily board information of a team that the user is not member", async () => {
    const INVALID_USER = 3;
    const INVALID_TEAM_MEMBER = 2;

    const response = await request(app)
      .get(`/dailys/boards/${INVALID_TEAM_MEMBER}/${INVALID_USER}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to create a daily board", async () => {
    const ID_LEADER_TEAM = 2;

    const response = await request(app)
      .post(`/dailys/boards/${TEAM_ID}/${ID_LEADER_TEAM}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("board");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to create more than one daily board in the same day", async () => {
    const response = await request(app)
      .post(`/dailys/boards/${OTHER_TEAM_ID}/${USER_DB_OTHER_TEAM.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(409);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to create a daily board if the user is not leader", async () => {
    const UNAUTHORIZED_USER_ID = 4;

    const response = await request(app)
      .post(`/dailys/boards/${TEAM_ID}/${UNAUTHORIZED_USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to delete a daily board", async () => {
    const response = await request(app)
      .delete(
        `/dailys/boards/${OTHER_TEAM_ID}/${ID_BOARD_TO_DELETE}/${USER_DB_OTHER_TEAM.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to delete a daily board that not exists", async () => {
    const INVALID_BOARD_ID = 9646887;

    const response = await request(app)
      .delete(
        `/dailys/boards/${OTHER_TEAM_ID}/${INVALID_BOARD_ID}/${USER_DB_OTHER_TEAM.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to return the daily content information", async () => {
    const BOARD_ID = 1;
    const response = await request(app)
      .get(`/dailys/boards/contents/${TEAM_ID}/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("dailyContents");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to return the daily content information from an invalid board", async () => {
    const INVALID_BOARD_ID = 1545654161;
    const response = await request(app)
      .get(
        `/dailys/boards/contents/${TEAM_ID}/${INVALID_BOARD_ID}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to create a daily content", async () => {
    const BOARD_ID = 1;
    const CONTENT_DATA = {
      did_yesterday: "Making Tests",
      do_today: "Do Tests again",
      problems: "Tests",
    };

    const response = await request(app)
      .post(`/dailys/boards/contents/${TEAM_ID}/${BOARD_ID}/${USER_DB.id}`)
      .send(CONTENT_DATA)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("content");
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to delete a daily content", async () => {
    const BOARD_ID = 1;
    const response = await request(app)
      .delete(
        `/dailys/boards/contents/${TEAM_ID}/${BOARD_ID}/${DAILY_CONTENT_TO_DELETE}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to delete a daily content that do not exists", async () => {
    const BOARD_ID = 1;
    const INVALID_DAILY_CONTENT = 9265964525;

    const response = await request(app)
      .delete(
        `/dailys/boards/contents/${TEAM_ID}/${BOARD_ID}/${INVALID_DAILY_CONTENT}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to delete a daily content that the user is not the author", async () => {
    const BOARD_ID = 1;
    const NOT_MY_DAILY_CONTENT = 3;

    const response = await request(app)
      .delete(
        `/dailys/boards/contents/${TEAM_ID}/${BOARD_ID}/${NOT_MY_DAILY_CONTENT}/${USER_DB.id}`
      )
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });

  it("Should be able to update a daily content", async () => {
    const BOARD_ID = 1;
    const NEW_CONTENT = {
      did_yesterday: "Fiz algo ontem.",
      do_today: "Estou fazendo algo hoje.",
      problems: "Muitos problemas.",
    };
    const response = await request(app)
      .put(`/dailys/boards/contents/update/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(NEW_CONTENT);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("newContent");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to update a daily content from another user", async () => {
    const BOARD_ID = 2;
    const NEW_CONTENT = {
      did_yesterday: "Fiz algo ontem.",
      do_today: "Estou fazendo algo hoje.",
      problems: "Muitos problemas.",
    };
    const response = await request(app)
      .put(`/dailys/boards/contents/update/${BOARD_ID}/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(NEW_CONTENT);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });
  
});
