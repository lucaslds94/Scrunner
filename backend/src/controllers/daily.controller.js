const User = require("../models/User");
const Team = require("../models/Team");
const DailyBoard = require("../models/DailyBoard");
const DailyContent = require("../models/DailyContent");

const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

module.exports = {
  async index(req, res) {
    const { teamId, userId } = req.params;

    const boards = await DailyBoard.findAll({
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
