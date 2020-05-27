const UserTeam = require("../models/UserTeam");

module.exports = {
  userInTeam: async (req, res, next) => {
    const { userId: user_id, teamId: team_id } = req.params;

    const userInTeam = await UserTeam.findOne({
      where: {
        user_id,
        team_id,
      },
    });

    if (!userInTeam) {
      return res.status(403).json({ err: " Access denied " });
    }

    next();
  },
};
