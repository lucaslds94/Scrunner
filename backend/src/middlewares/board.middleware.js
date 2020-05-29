const DailyBoard = require("../models/DailyBoard");

module.exports = {
  board: async (req, res, next) => {
    const { boardId } = req.params;

    const board = await DailyBoard.findOne({
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
