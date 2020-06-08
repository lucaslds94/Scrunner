const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

const TaskBoard = require("../models/TaskBoard");

module.exports = {
  async indexBoards(req, res) {
    const { userId, teamId } = req.params;

    const boards = await TaskBoard.findAll({
      where: {
        team_id: teamId,
      },
      order: [["createdAt", "DESC"]],
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ boards, token });
  },

  async storeBoard(req, res) {
    const { userId, teamId } = req.params;
    const { name, days } = req.body;

    const newBoard = await TaskBoard.create({
      name,
      date_range: days,
      team_id: teamId,
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ board: newBoard, token });
  },

  async deleteBoard(req, res) {
    const { teamId, boardId } = req.params;

    await TaskBoard.destroy({
      where: {
        id: boardId,
        team_id: teamId,
      },
    });

    return res.status(204).send();
  },
};
