const Team = require('../models/Team');

module.exports = {
  team: async (req, res, next) => {
    const { teamId } = req.params;

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(400).json({ err: "Team not found" });
    }

    next();
  }
}