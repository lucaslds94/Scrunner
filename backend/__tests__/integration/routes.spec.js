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

describe("Sessions routes", () => {
  it("Should be able to login", async () => {
    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to login with an invalid email", async () => {
    const INVALID_USER = {
      email: "mairoasdsa@teste.com",
      password: "1132211",
    };

    const response = await request(app).post("/login").send(INVALID_USER);

    expect(response.status).toEqual(400);
  });

  it("Should not be able to login with an invalid password", async () => {
    const INVALID_USER = {
      email: "johndoe@test.com",
      password: "1132211",
    };

    const response = await request(app).post("/login").send(INVALID_USER);

    expect(response.status).toEqual(401);
  });

  it("Should not be able to login with a disabled account", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: MOCK_USER.email, password: MOCK_USER.password });

    expect(response.status).toEqual(403);
  });
});

describe("Leader Dashboard", () => {
  it("Should be able to return the leader dashboard information", async () => {
    const response = await request(app)
      .get(`/dashboard/leader/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("teamCount");
    expect(response.body).toHaveProperty("colabCount");
    expect(response.body).toHaveProperty("doneTasksCount");
    expect(response.body).toHaveProperty("graphs");
    expect(response.body).toHaveProperty("usersInTeam");
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to return the leader dashboard information with an invalid id", async () => {
    const response = await request(app)
      .get(`/dashboard/leader/4584`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });

  it("Should not be able to return the leader dashboard information with a colaborator id", async () => {
    const VALID_ID = 2;

    const response = await request(app)
      .get(`/dashboard/leader/${VALID_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("err");
  });
});

describe("Teams Routes", () => {
  it("Should be able to remove a user from a team", async () => {
    const MOCK_REMOVE_USER_TEAM = {
      user_id: 10,
      team_id: 2,
    };

    const response = await request(app)
      .delete("/teams")
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(MOCK_REMOVE_USER_TEAM);

    expect(response.status).toEqual(204);
  });

  it("Should not be able to remove a user with an invalid id from a team ", async () => {
    const MOCK_REMOVE_USER_TEAM = {
      user_id: 4561556132131,
      team_id: 2,
    };

    const response = await request(app)
      .delete("/teams")
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(MOCK_REMOVE_USER_TEAM);

    expect(response.status).toEqual(400);
  });

  it("Should not be able to remove a user from a team with an invalid id", async () => {
    const MOCK_REMOVE_USER_TEAM = {
      user_id: 10,
      team_id: 273817389217,
    };

    const response = await request(app)
      .delete("/teams")
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(MOCK_REMOVE_USER_TEAM);

    expect(response.status).toEqual(400);
  });

  it("Should not be able to remove a user from a team when there's no association between them", async () => {
    const MOCK_REMOVE_USER_TEAM = {
      user_id: 10,
      team_id: 1,
    };

    const response = await request(app)
      .delete("/teams")
      .set("Authorization", `Bearer ${USER_DB.token}`)
      .send(MOCK_REMOVE_USER_TEAM);

    expect(response.status).toEqual(403);
  });

  it("Should be able to return the teams from a user", async () => {
    const response = await request(app)
      .get(`/teams/${USER_DB.id}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body.teams)).toEqual(true);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to return the teams from a invalid user ", async () => {
    const INVALID_USER_ID = '12312312';

    const response = await request(app)
      .get(`/teams/${INVALID_USER_ID}`)
      .set("Authorization", `Bearer ${USER_DB.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("err");
  });
});
