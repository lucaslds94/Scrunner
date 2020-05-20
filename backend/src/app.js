require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

require("./database/");

const express = require("express");
const cors = require("cors");
const app = express();

const usersRoutes = require("./routes/users.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const teamsRoutes = require("./routes/teams.routes");

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(sessionsRoutes);
app.use(teamsRoutes);

module.exports = app;
