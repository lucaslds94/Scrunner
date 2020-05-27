const request = require("supertest");
const app = require("../../src/app");

let USER_DB = {
  id: 1,
  email: "johndoe@test.com",
  password: "12345678",
  token: null,
};

let COLLABORATOR_DB = {
  id: 2,
  email: "johntravolta@test.com",
  password: "12345678",
};

describe("Dashboard", () => {
  beforeAll(async () => {
    const response = await request(app).post("/login").send(USER_DB);

    USER_DB.token = response.body.token;
  });

  describe("Owner Routes", () => {
    it("Should be able to return the owner dashboard information", async () => {
      const response = await request(app)
        .get(`/dashboard/owner/${USER_DB.id}`)
        .set("Authorization", `Bearer ${USER_DB.token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("teamCount");
      expect(response.body).toHaveProperty("colabCount");
      expect(response.body).toHaveProperty("doneTasksCount");
      expect(response.body).toHaveProperty("graphs");
      expect(response.body).toHaveProperty("usersInTeam");
      expect(response.body).toHaveProperty("token");
    });

    it("Should not be able to return the owner dashboard information with an invalid id", async () => {
      const response = await request(app)
        .get(`/dashboard/owner/4584`)
        .set("Authorization", `Bearer ${USER_DB.token}`);

      expect(response.status).toEqual(400);
      expect(response.body).toHaveProperty("err");
    });

    it("Should not be able to return the owner dashboard information with a collaborator id", async () => {
      const VALID_ID = 2;

      const response = await request(app)
        .get(`/dashboard/owner/${VALID_ID}`)
        .set("Authorization", `Bearer ${USER_DB.token}`);

      expect(response.status).toEqual(403);
      expect(response.body).toHaveProperty("err");
    });

    it("Should not be able to return the owner dashboard without a JWT", async () => {
      const response = await request(app).get(`/dashboard/owner/${USER_DB.id}`);

      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty("err");
    });

    it("Should not be able to return the owner dashboard with an invalid JWT", async () => {
      const INVALID_TOKEN = "adiouj239u2r89rj239rf28j";

      const response = await request(app)
        .get(`/dashboard/owner/${USER_DB.id}`)
        .set("Authorization", `Bearer ${INVALID_TOKEN}`);

      expect(response.status).toEqual(401);
      expect(response.body).toHaveProperty("err");
    });
  });

  describe("Collaborator Routes", () => {
    it("Should be able to return the collaborator dashboard information", async () => {
      const response = await request(app)
        .get(`/dashboard/collaborator/${COLLABORATOR_DB.id}`)
        .set("Authorization", `Bearer ${USER_DB.token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("teamCount");
      expect(response.body).toHaveProperty("dailyCount");
      expect(response.body).toHaveProperty("taskCount");
      expect(response.body).toHaveProperty("token");
    });

    it("Should not be able to return the collaborator dashboard information with an invalid id", async () => {
      const response = await request(app)
        .get(`/dashboard/collaborator/${USER_DB.id}`)
        .set("Authorization", `Bearer ${USER_DB.token}`);

      expect(response.status).toEqual(403);
      expect(response.body).toHaveProperty("err");
    });
  });
});
