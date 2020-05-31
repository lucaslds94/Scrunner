const DailyContent = require("../models/DailyContent");

module.exports = {
  dailyContent: async (req, res, next) => {
    const { contentId } = req.params;

    const content = await DailyContent.findByPk(contentId);

    if (!content) {
      return res.status(400).json({ err: "Content not found" });
    }

    next();
  },
};
