const UserTeam = require('../models/UserTeam');

module.exports = {
  isLeader: async (req, res, next) => {
    const { userId: user_id, teamId: team_id } = req.params;

    const leaderUser = await UserTeam.findOne({
      where: {
        user_id,
        team_id,
        is_leader: true
      }
    });

    if (!leaderUser) {
      return res.status(403).json({ err: "Acess Denied" });
    }

    next();
  }
}