require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

require("./database/");

const express = require("express");
const cors = require("cors");
const app = express();

const usersRoutes = require("./routes/users.routes");
const sessionsRoutes = require("./routes/sessions.routes");

app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(sessionsRoutes);

module.exports = app;
