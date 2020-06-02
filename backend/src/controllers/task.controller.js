const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

const TaskBoard = require("../models/TaskBoard");

module.exports = {
  async index(req, res) {
    const { userId, teamId } = req.params;

    const boards = await TaskBoard.findAll({
      where: {
        team_id: teamId,
      },
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ boards, token });
  },
};
