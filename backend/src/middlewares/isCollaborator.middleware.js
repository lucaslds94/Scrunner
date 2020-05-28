const User = require('../models/User');

module.exports = {
  isCollaborator: async (req, res, next) => {
    const { userId  } = req.params;

    const collaborator = await User.findOne({
      where: {
        id: userId,
        is_owner: false,
      },
    });

    if (!collaborator) {
      return res.status(403).json({ err: "Access denied" });
    }

    next();
  }
}