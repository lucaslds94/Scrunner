const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

const User = require("../models/User");
const Team = require("../models/Team");
const UserTeam = require("../models/UserTeam");
const TaskBoard = require("../models/TaskBoard");
const Task = require("../models/Task");

const { Op, Sequelize } = require("sequelize");

module.exports = {
  async store(req, res) {
    let { email, password, name, is_owner } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      password = bcrypt.hashSync(password, 10);

      user = await User.create({
        email,
        password,
        name,
        is_owner,
        is_active: true,
      });

      delete user.dataValues.password;

      return res.json(user.dataValues);
    }

    return res.status(409).json({ err: "Email is already in use" });
  },

  async disable(req, res) {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(409).json({ err: "User not found" });
    }

    await user.update(
      {
        is_active: false,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(204).send();
  },

  async indexLeader(req, res) {
    const { id } = req.params;

    let user = await User.findOne({
      where: {
        id,
        is_owner: true
      }
    });

    if (!user) {
      return res.status(403).json({ err: "Access denied" });
    }

    let { count: teamCount, rows: ownerTeams } = await UserTeam.findAndCountAll(
      {
        attributes: ["team_id"],
        where: {
          user_id: id,
        },
      }
    );

    ownerTeams = ownerTeams.map((teamObject) => {
      return { team_id: teamObject.team_id };
    });

    let { count: colabCount, rows: colabs } = await UserTeam.findAndCountAll({
      attributes: ["user_id"],
      where: {
        [Op.or]: ownerTeams,
        user_id: {
          [Op.ne]: id,
        },
      },
    });


    let boardTasksIds = await TaskBoard.findAll({
      attributes: ["id"],
      where: {
        [Op.or]: ownerTeams,
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

    colabs = colabs.map((boardObject) => {
      return { id: boardObject.user_id };
    });

    const usersInTeam = await User.findAll({
      attributes: ["id", "name"],
      where: {
        [Op.or]: colabs,
      },
      include: [
        {
          model: UserTeam,
          as: "user_isLeader",
          attributes: ["is_leader"],
        },
        {
          model: Team,
          as: "teams",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const token = sign({}, jwt.secret, {
      subject: `${id}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({
      teamCount,
      colabCount,
      doneTasksCount,
      graphs: { roundGraph: (doneTasksCount / tasksCount) * 100 },
      usersInTeam,
      token
    });
  },
};

