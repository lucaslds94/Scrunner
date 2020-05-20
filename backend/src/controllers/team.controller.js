const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");
const Team = require("../models/Team");
const User = require("../models/User");
const UserTeam = require("../models/UserTeam");

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    const teams = await UserTeam.findAll({
      attributes: ["id"],
      where: {
        user_id: id,
      },
      include: [
        {
          model: Team,
          as: "team",
          attributes: ["id", "name", "code", "category"],
          include: [
            {
              model: User,
              as: "users",
              attributes: ["id", "name", "is_owner"],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    const token = sign({}, jwt.secret, {
      subject: `${id}`,
      expiresIn: jwt.expiresIn,
    });

    res.json({ teams, token });
  },

  async exit(req, res) {
    const { user_id, team_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    const team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(400).json({ err: "Team not found" });
    }

    const userInTeam = await UserTeam.findOne({
      where: {
        user_id,
        team_id,
      },
    });

    if (!userInTeam) {
      return res.status(403).json({ err: "Access denied" });
    }

    await UserTeam.destroy({
      where: {
        user_id,
        team_id,
      },
    });

    return res.status(204).send();
  },
};
