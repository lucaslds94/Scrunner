const User = require("../models/User");
const Team = require("../models/Team");
const UserTeam = require("../models/UserTeam");
const TaskBoard = require("../models/TaskBoard");
const Task = require("../models/Task");
const DailyContent = require("../models/DailyContent");

const moment = require("moment");
require("moment/locale/pt-br");

const { createToken } = require("../utils/createToken");

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

    let [{ teams: burndown = [] }] = await User.findAll({
      where: {
        id: userId,
      },
      attributes: [],
      include: [
        {
          model: Team,
          as: "teams",
          attributes: ["id", "name"],

          through: {
            attributes: [],
          },
          include: [
            {
              model: TaskBoard,
              as: "task_boards",
              attributes: [
                "id",
                "name",
                "date_range",
                "created_at",
                "total_task_points",
              ],
              include: [
                {
                  model: Task,
                  as: "tasks",
                  attributes: ["updated_at", "task_points"],
                  required: false,
                  where: {
                    task_column_id: 3,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    burndown = burndown.map((burn) => {
      const task_boards = burn.dataValues.task_boards.map((board) => {
        const current_date = moment(new Date()).format("DD/MM");
        const dateRange = [];
        let completed_tasks = [];
        let total_tasks = board.dataValues.total_task_points;

        for (let i = 0; i <= board.date_range; i++) {
          dateRange.push(
            moment(board.dataValues.created_at).add(i, "days").format("DD/MM")
          );
        }

        board.dataValues.tasks.map((task) => {
          const formatted_date = moment(task.dataValues.updated_at).format(
            "DD/MM"
          );

          completed_tasks = dateRange.map((date) => {
            if (date <= current_date) {
              if (date == formatted_date) {
                total_tasks -= task.dataValues.task_points;
              }
              return total_tasks;
            }
          });

          completed_tasks = completed_tasks.filter((data) => data);
          completed_tasks.unshift(board.dataValues.total_task_points);
          return {
            ...task.dataValues,
          };
        });

        delete board.dataValues.tasks;

        return {
          ...board.dataValues,
          completed_tasks,
        };
      });

      return {
        ...burn.dataValues,
        task_boards,
      };
    });

    const token = createToken(userId);

    return res.json({
      teamCount,
      colabCount,
      doneTasksCount,
      graphs: {
        roundGraph: ((doneTasksCount / tasksCount) * 100).toFixed(0),
        burndown,
      },
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

    let [{ teams: burndown = [] }] = await User.findAll({
      where: {
        id: userId,
      },
      attributes: [],
      include: [
        {
          model: Team,
          as: "teams",
          attributes: ["id", "name"],

          through: {
            attributes: [],
          },
          include: [
            {
              model: TaskBoard,
              as: "task_boards",
              attributes: [
                "id",
                "name",
                "date_range",
                "created_at",
                "total_task_points",
              ],
              include: [
                {
                  model: Task,
                  as: "tasks",
                  attributes: ["updated_at", "task_points"],
                  required: false,
                  where: {
                    task_column_id: 3,
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    burndown = burndown.map((burn) => {
      const task_boards = burn.dataValues.task_boards.map((board) => {
        const current_date = moment(new Date()).format("DD/MM");
        const dateRange = [];
        let completed_tasks = [];
        let total_tasks = board.dataValues.total_task_points;

        for (let i = 0; i <= board.date_range; i++) {
          dateRange.push(
            moment(board.dataValues.created_at).add(i, "days").format("DD/MM")
          );
        }

        board.dataValues.tasks.map((task) => {
          const formatted_date = moment(task.dataValues.updated_at).format(
            "DD/MM"
          );

          completed_tasks = dateRange.map((date) => {
            
            if (date <= current_date) {
              if (date == formatted_date) {
                total_tasks -= task.dataValues.task_points;
              }

              return total_tasks;
            }
          });

          completed_tasks = completed_tasks.filter((data) => data);
          completed_tasks.unshift(board.dataValues.total_task_points);
          return {
            ...task.dataValues,
          };
        });

        delete board.dataValues.tasks;

        return {
          ...board.dataValues,
          completed_tasks,
        };
      });

      return {
        ...burn.dataValues,
        task_boards,
      };
    });

    const token = createToken(userId);
    return res.json({
      teamCount,
      dailyCount,
      taskCount,
      graphs: { burndown },
      token,
    });
  },
};
