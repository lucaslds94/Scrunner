const request = require("supertest");
const app = require("../../src/app");

const MOCK_USER = {
  name: "Example",
  email: "example@email.com",
  password: "12345678",
  is_owner: 1,
};

let ID_MOCK_USER = "";

const USER_DB = {
  email: "johndoe@test.com",
  password: "12345678"
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

    expect(response.status).toEqual(409);
  });

});

describe("Sessions routes", () => {
  it("Should be able to login", async () => {
    const response = await request(app).post('/login').send(USER_DB);
    
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to login with an invalid email", async () => {
    const INVALID_USER =  {
      email: "mairoasdsa@teste.com",
      password: "1132211"
    }

    const response = await request(app).post('/login').send(INVALID_USER);
    
    expect(response.status).toEqual(400);
  });

  it("Should not be able to login with an invalid password", async () => {
    const INVALID_USER =  {
      email: "johndoe@test.com",
      password: "1132211"
    }

    const response = await request(app).post('/login').send(INVALID_USER);
    
    expect(response.status).toEqual(401);
  });

  it("Should not be able to login with a disabled account", async () => {
    const response = await request(app)
    .post("/login")
    .send({email: MOCK_USER.email, password: MOCK_USER.password});

    expect(response.status).toEqual(403);
  });
})
