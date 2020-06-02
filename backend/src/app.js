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
const dashboardRoutes = require("./routes/dashboard.routes");
const dailysRoutes = require("./routes/dailys.routes");
const tasksRoutes = require("./routes/tasks.routes");

app.use(cors());
app.use(express.json());

app.use(usersRoutes);
app.use(sessionsRoutes);
app.use(teamsRoutes);
app.use(dashboardRoutes);
app.use(dailysRoutes);
app.use(tasksRoutes);

module.exports = app;
