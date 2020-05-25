const crypto = require("crypto");
const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

const Team = require("../models/Team");
const User = require("../models/User");
const UserTeam = require("../models/UserTeam");
const TaskBoard = require("../models/TaskBoard");
const Task = require("../models/Task");

const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    const teams = await UserTeam.findAll({
      attributes: ["id"],
      where: {
        user_id: userId,
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
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    res.json({ teams, token });
  },

  async details(req, res) {
    const { teamId, userId } = req.params;

    let team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(400).json({ err: "Team not found" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    const userInTeam = await UserTeam.findOne({
      where: { user_id: userId, team_id: teamId },
    });

    if (!userInTeam) {
      return res.status(403).json({ err: "Access denied" });
    }

    team = await Team.findAll({
      where: {
        id: teamId,
      },
      attributes: ["id", "name", "code", "category"],
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "is_owner"],
          through: {
            attributes: [],
          },
          required: true,
          include: [
            {
              model: UserTeam,
              as: "user_isLeader",
              attributes: ["is_leader"],
              where: {
                team_id: teamId,
              },
            },
          ],
        },
      ],
    });

    [team] = team.map((objectTeam) => {
      const users = objectTeam.dataValues.users.map((user) => {
        return {
          id: user.dataValues.id,
          name: user.dataValues.name,
          is_owner: user.dataValues.is_owner,
          is_leader: user.dataValues.user_isLeader[0].is_leader,
        };
      });

      return {
        ...objectTeam.dataValues,
        users,
      };
    });

    let boardTasksIds = await TaskBoard.findAll({
      attributes: ["id"],
      where: {
        team_id: teamId,
      },
    });

    boardTasksIds = boardTasksIds.map((boardObject) => {
      return { task_board_id: boardObject.id };
    });

    const { count: doneTasksCount } = await Task.findAndCountAll({
      where: {
        [Op.or]: boardTasksIds,
        task_column_id: 3,
      },
    });

    const { count: tasksCount } = await Task.findAndCountAll({
      where: {
        [Op.or]: boardTasksIds,
      },
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    res.send({
      team,
      graph: { total_done_tasks: doneTasksCount, total_tasks: tasksCount },
      token,
    });
  },

  async store(req, res) {
    const { user_id, name, category } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    const teamCode = crypto.randomBytes(4).toString("HEX").toUpperCase();

    const {
      dataValues: { id, code },
    } = await Team.create({ name, code: teamCode, category });

    await UserTeam.create({
      is_leader: true,
      user_id,
      team_id: id,
    });

    const token = sign({}, jwt.secret, {
      subject: `${user_id}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ team: { id, code }, token });
  },

  async entry(req, res) {
    const { user_id, code } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    if (user.dataValues.is_owner) {
      return res.status(403).json({ err: "Access denied" });
    }

    let team = await Team.findOne({
      where: {
        code
      }
    });

    if (!team) {
      return res.status(400).json({ err: "Invalid code" });
    }

    const userInTeam = await UserTeam.findOne({
      where: {
        user_id,
        team_id: team.dataValues.id
      }
    })

    if (userInTeam) {
      return res.status(409).json({ err: "This user is already a member of the Team" });
    }

    await UserTeam.create({
      user_id,
      team_id: team.dataValues.id,
      is_leader: false
    });

    let teamResponse = await Team.findAll({
      where: {
        id: team.dataValues.id,
      },
      attributes: ["id", "name", "code", "category"],
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "is_owner"],
          through: {
            attributes: [],
          },
          required: true,
          include: [
            {
              model: UserTeam,
              as: "user_isLeader",
              attributes: ["is_leader"],
              where: {
                team_id: team.dataValues.id,
              },
            },
          ],
        },
      ],
    });

    [teamResponse] = teamResponse.map((objectTeam) => {
      const users = objectTeam.dataValues.users.map((user) => {
        return {
          id: user.dataValues.id,
          name: user.dataValues.name,
          is_owner: user.dataValues.is_owner,
          is_leader: user.dataValues.user_isLeader[0].is_leader,
        };
      });

      return {
        ...objectTeam.dataValues,
        users,
      };
    });

    const token = sign({}, jwt.secret, {
      subject: `${user_id}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ team: teamResponse, token });

  },

  async update(req, res) {
    const { userId: user_id, teamId: team_id } = req.params;

    const { name, category, leader_id } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }

    let team = await Team.findByPk(team_id);

    if (!team) {
      return res.status(400).json({ err: "Team not found" });
    }

    if (leader_id) {
      const userInTeam = await UserTeam.findOne({
        where: {
          user_id: leader_id,
          team_id,
        },
      });

      if (!userInTeam) {
        return res.status(400).json({ err: "User not found in this team" });
      }
    }

    team = await Team.update(
      {
        name,
        category,
      },
      {
        where: {
          id: team_id,
        },
      }
    );

    await UserTeam.update(
      {
        is_leader: false,
      },
      {
        where: {
          team_id: Number(team_id),
          user_id: {
            [Op.ne]: user_id,
          },
        },
      }
    );

    if (leader_id !== "") {
      await UserTeam.update(
        {
          is_leader: true,
        },
        {
          where: {
            team_id,
            user_id: leader_id,
          },
        }
      );
    }

    team = await Team.findAll({
      where: {
        id: team_id,
      },
      attributes: ["id", "name", "code", "category"],
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "name", "is_owner"],
          through: {
            attributes: [],
          },
          required: true,
          include: [
            {
              model: UserTeam,
              as: "user_isLeader",
              attributes: ["is_leader"],
              where: {
                team_id,
              },
            },
          ],
        },
      ],
    });

    [team] = team.map((objectTeam) => {
      const users = objectTeam.dataValues.users.map((user) => {
        return {
          id: user.dataValues.id,
          name: user.dataValues.name,
          is_owner: user.dataValues.is_owner,
          is_leader: user.dataValues.user_isLeader[0].is_leader,
        };
      });

      return {
        ...objectTeam.dataValues,
        users,
      };
    });

    const token = sign({}, jwt.secret, {
      subject: `${user_id}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ team, token });
  },

  async delete(req, res) {
    const { userId, teamId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
        is_owner: true,
      },
    });

    if (!user) {
      return res.status(403).json({ err: "Access denied" });
    }

    const team = await Team.findByPk(teamId);

    if (!team) {
      return res.status(400).json({ err: "Team not found" });
    }

    const userInTeam = await UserTeam.findOne({
      where: {
        user_id: userId,
        team_id: teamId,
      },
    });

    if (!userInTeam) {
      return res.status(403).json({ err: "Access denied" });
    };

    await Team.destroy({
      where: {
        id: teamId
      }
    });

    return res.status(204).send();

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
