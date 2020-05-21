const request = require("supertest");
const app = require("../../src/app");

const MOCK_USER = {
    name: "Example",
    email: "example@email.com",
    password: "12345678",
    is_owner: 1,
  };

let USER_DB = {
    id: 1,
    email: "johndoe@test.com",
    password: "12345678",
    token: null,
};

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