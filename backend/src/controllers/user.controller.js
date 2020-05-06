// const User = require('../models/User');
// const Teams = require('../models/Teams');
const UserTeams = require('../models/UserTeams');

module.exports = {
  async index(req, res) {
    const {is_leader = 'T', users_id = 1, teams_id = 1} = req.body;

    const user = await UserTeams.create({
      is_leader,users_id,teams_id,
    })

    return res.json(user);
  },
};
