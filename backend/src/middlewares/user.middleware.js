const User = require('../models/User');

module.exports = {
  user: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    next();
  }
}