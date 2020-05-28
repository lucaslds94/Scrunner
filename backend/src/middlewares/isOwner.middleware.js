const User = require('../models/User');

module.exports = {
  isOwner: async (req, res, next) => {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
        is_owner: true,
      },
    });

    if (!user) {
      return res.status(403).json({ err: "Access denied" });
    }

    next();
  }
}