const User = require("../models/User");
const Team = require("../models/Team");
const UserTeam = require("../models/UserTeam");
const TaskBoard = require("../models/TaskBoard");
const Task = require("../models/Task");
const DailyContent = require("../models/DailyContent");

const moment = require("moment");

const { serializedArray } = require("../utils/serializedImage");

const { createToken } = require("../utils/createToken");

const { Op, fn, col } = require("sequelize");

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
      attributes: ["id", "name", "image"],
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
        image: user.image,
        teams,
      };
    });

    usersInTeam = serializedArray(usersInTeam);

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
            },
          ],
        },
      ],
    });

    const tasks_burndown = await Task.findAll({
      attributes: [
        "updated_at",
        fn("sum", col("task_points")),
        "task_board_id",
      ],
      group: ["updated_at", "task_board_id"],
      raw: true,
      where: {
        [Op.or]: boardTasksIds,
        task_column_id: 3,
      },
    });

    burndown = burndown.map((team) => {
      const taskBoards = team.task_boards.map((taskBoard) => {
        const doneTasksOfTheDay = tasks_burndown.filter(
          (task) => task.task_board_id === taskBoard.dataValues.id
        );
        return {
          ...taskBoard.dataValues,
          doneTasksOfTheDay: doneTasksOfTheDay || [],
        };
      });
      return {
        ...team.dataValues,
        task_boards: taskBoards,
      };
    });

    burndown = burndown.map((burn) => {
      const task_boards = burn.task_boards.map((board) => {
        const current_date = moment(new Date()).format("MM/DD/YYYY");

        const dateRange = [0];

        let remainingPoints = [];

        let totalTaskPoints = board.total_task_points;

        let total_tasks = board.total_task_points;
        const decrease = board.total_task_points / board.date_range;

        for (let i = 0; i < board.date_range; i++) {
          dateRange.push(
            moment(board.created_at).add(i, "days").format("MM/DD/YYYY")
          );
        }

        const plannedPoints = dateRange.map((_, index) => {
          if (index !== 0) {
            totalTaskPoints = totalTaskPoints - decrease;
          }

          return totalTaskPoints.toFixed(0);
        });

        for (let i = 0; i < dateRange.length; i++) {
          if (dateRange[i] <= current_date) {
            for (let j = 0; j < board.doneTasksOfTheDay.length; j++) {
              const formatted_date = moment(
                board.doneTasksOfTheDay[j].updated_at
              ).format("MM/DD/YYYY");

              if (formatted_date == dateRange[i]) {
                total_tasks -= board.doneTasksOfTheDay[j].sum;
              }
            }
            remainingPoints.push(total_tasks);
          }
        }

        if (remainingPoints.length === 0) {
          remainingPoints.push(board.total_task_points);
        }

        remainingPoints = remainingPoints.filter((data) => data != null);

        remainingPoints.unshift(board.total_task_points);

        delete board.doneTasksOfTheDay;

        return {
          ...board,
          remaining_points: remainingPoints,
          planned_points: plannedPoints,
          date_range: dateRange,
        };
      });

      return {
        ...burn,
        task_boards,
      };
    });

    const token = createToken(userId);

    return res.json({
      teamCount,
      colabCount,
      doneTasksCount,
      graphs: {
        roundGraph:
          doneTasksCount > 0 || tasksCount > 0
            ? ((doneTasksCount / tasksCount) * 100).toFixed(0)
            : 0,
        burndown,
      },
      usersInTeam,
      token,
    });
  },

  async indexCollaborator(req, res) {
    const { userId } = req.params;

    let { rows: ownerTeams } = await UserTeam.findAndCountAll({
      attributes: ["team_id"],
      where: {
        user_id: userId,
      },
    });

    ownerTeams = ownerTeams.map((teamObject) => {
      return { team_id: teamObject.team_id };
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
            },
          ],
        },
      ],
    });

    const tasks_burndown = await Task.findAll({
      attributes: [
        "updated_at",
        fn("sum", col("task_points")),
        "task_board_id",
      ],
      order: [["updated_at", "ASC"]],
      group: ["updated_at", "task_board_id"],
      raw: true,
      where: {
        [Op.or]: boardTasksIds,
        task_column_id: 3,
      },
    });

    burndown = burndown.map((team) => {
      const taskBoards = team.task_boards.map((taskBoard) => {
        const doneTasksOfTheDay = tasks_burndown.filter(
          (task) => task.task_board_id === taskBoard.dataValues.id
        );
        return {
          ...taskBoard.dataValues,
          doneTasksOfTheDay: doneTasksOfTheDay || [],
        };
      });
      return {
        ...team.dataValues,
        task_boards: taskBoards,
      };
    });

    burndown = burndown.map((burn) => {
      const task_boards = burn.task_boards.map((board) => {
        const current_date = moment(new Date()).format("MM/DD/YYYY");

        const dateRange = [0];

        let remainingPoints = [];

        let totalTaskPoints = board.total_task_points;

        let total_tasks = board.total_task_points;
        const decrease = board.total_task_points / board.date_range;

        for (let i = 0; i < board.date_range; i++) {
          dateRange.push(
            moment(board.created_at).add(i, "days").format("MM/DD/YYYY")
          );
        }

        const plannedPoints = dateRange.map((_, index) => {
          if (index !== 0) {
            totalTaskPoints = totalTaskPoints - decrease;
          }

          return totalTaskPoints.toFixed(0);
        });

        for (let i = 0; i < dateRange.length; i++) {
          if (dateRange[i] <= current_date) {
            for (let j = 0; j < board.doneTasksOfTheDay.length; j++) {
              const formatted_date = moment(
                board.doneTasksOfTheDay[j].updated_at
              ).format("MM/DD/YYYY");

              if (formatted_date == dateRange[i]) {
                total_tasks -= board.doneTasksOfTheDay[j].sum;
              }
            }
            remainingPoints.push(total_tasks);
          }
        }

        if (remainingPoints.length === 0) {
          dateRange.map((date) => {
            if (date <= current_date) {
              remainingPoints.push(board.total_task_points);
            }
          });
        }

        remainingPoints = remainingPoints.filter((data) => data != null);

        remainingPoints.unshift(board.total_task_points);

        delete board.doneTasksOfTheDay;

        return {
          ...board,
          remaining_points: remainingPoints,
          planned_points: plannedPoints,
          date_range: dateRange,
        };
      });

      return {
        ...burn,
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
