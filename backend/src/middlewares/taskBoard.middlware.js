const TaskBoard = require("../models/TaskBoard");

module.exports = {
  taskBoard: async (req, res, next) => {
    const { boardId } = req.params;

    const board = await TaskBoard.findOne({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      return res.status(400).json({ err: "Board not found" });
    }

    next();
  },
};
