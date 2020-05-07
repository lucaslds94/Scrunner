// const User = require('../models/User');
// const Team = require('../models/Team');
const UserTeam = require('../models/UserTeam');

module.exports = {
  async index(req, res) {
    const {is_leader = 'T', users_id = 1, teams_id = 1} = req.body;

    const user = await UserTeams.create({
      is_leader,users_id,teams_id,
    })

    return res.json(user);
  },
};
