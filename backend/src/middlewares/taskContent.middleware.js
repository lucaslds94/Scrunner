const Task = require("../models/Task");

module.exports = {
  taskContent: async (req, res, next) => {
    const { contentId } = req.params;

    const taskContent = await Task.findOne({
      where: {
        id: contentId,
      },
    });

    if (!taskContent) {
      return res.status(400).json({ err: "Content not found" });
    }

    next();
  },
};
