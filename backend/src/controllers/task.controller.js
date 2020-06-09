const TaskBoard = require("../models/TaskBoard");
const TaskColumn = require("../models/TaskColumn");
const Task = require("../models/Task");

const { createToken } = require("../utils/createToken");

module.exports = {
  async boardsIndex(req, res) {
    const { userId, teamId } = req.params;

    const boards = await TaskBoard.findAll({
      where: {
        team_id: teamId,
      },
      order: [["createdAt", "DESC"]],
    });

    const token = createToken(userId);

    return res.json({ boards, token });
  },

  async tasksIndex(req, res) {
    const { teamId, boardId, userId } = req.params;

    const tasks = await TaskColumn.findAll({
      include: [
        {
          model: Task,
          as: "tasks",
          include: [
            {
              model: TaskBoard,
              as: "task_board",
              where: {
                team_id: teamId,
                id: boardId,
              },
              attributes: [],
            },
          ],
        },
      ],
    });

    const token = createToken(userId);

    return res.json({ tasks, token });
  },

  async storeBoard(req, res) {
    const { userId, teamId } = req.params;
    const { name, days } = req.body;

    const newBoard = await TaskBoard.create({
      name,
      date_range: days,
      team_id: teamId,
    });

    const token = createToken(userId);

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
