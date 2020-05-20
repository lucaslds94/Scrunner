const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");
const Team = require("../models/Team");
const User = require("../models/User");
const UserTeam = require("../models/UserTeam");

module.exports = {
  async exit (req, res) {
    const { user_id, team_id } = req.body;

    const user = await User.findByPk(user_id);

    if(!user){
      return res.status(400).json({ err: "User not found" });
    }

    const team = await Team.findByPk(team_id);

    if(!team){
      return res.status(400).json({ err: "Team not found" });
    }

    const userInTeam = await UserTeam.findOne({where: {
      user_id,
      team_id
    }});

    if(!userInTeam){
      return res.status(403).json({ err: "Access denied" });
    }

    await UserTeam.destroy({where: {
      user_id,
      team_id
    }})

    return res.status(204).send();
  }
}