const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

const User = require("../models/User");
const Team = require("../models/Team");
const UserTeam = require("../models/UserTeam");
const TaskBoard = require("../models/TaskBoard");
const Task = require("../models/Task");
const DailyContent = require("../models/DailyContent");

const { Op } = require("sequelize");

module.exports = {
  async indexOwner(req, res) {
    const { userId } = req.params;

    let { count: teamCount, rows: ownerTeams } = await UserTeam.findAndCountAll(
      {
        attributes: ["team_id"],
        where: {
          user_id: userId,
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
          [Op.ne]: userId,
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

    let usersInTeam = await User.findAll({
      attributes: ["id", "name"],
      where: {
        [Op.or]: colabs,
      },
      include: [
        {
          model: UserTeam,
          where: {
            [Op.or]: ownerTeams,
          },
          as: "user_isLeader",
          attributes: ["is_leader"],
        },
        {
          model: Team,
          as: "teams",
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    usersInTeam = usersInTeam.map((user) => {
      let teams = user.user_isLeader.map((isLeader, index) => {
        return {
          id: user.teams[index].id,
          name: user.teams[index].name,
          isLeader: isLeader.is_leader,
        };
      });

      return {
        id: user.id,
        name: user.name,
        teams,
      };
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({
      teamCount,
      colabCount,
      doneTasksCount,
      graphs: { roundGraph: (doneTasksCount / tasksCount) * 100 },
      usersInTeam,
      token,
    });
  },

  async indexCollaborator(req, res) {
    const { userId } = req.params;
    
    const { count: teamCount } = await UserTeam.findAndCountAll({
      where: {
        user_id: userId,
      },
    });

    const { count: dailyCount } = await DailyContent.findAndCountAll({
      where: {
        user_id: userId,
      },
    });

    const { count: taskCount } = await Task.findAndCountAll({
      where: {
        user_id: userId,
      },
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ teamCount, dailyCount, taskCount, token });
  },
};
