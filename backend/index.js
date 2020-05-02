const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require('./routes/user.router');

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(3333, () => {
  console.log("[SERVER] server runing in port 3333");
});
