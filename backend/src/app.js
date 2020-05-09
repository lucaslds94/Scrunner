require('dotenv').config();
require('./database/');
const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require('./routes/user.router');

app.use(cors());
app.use(express.json());
app.use(userRouter);

module.exports = app;