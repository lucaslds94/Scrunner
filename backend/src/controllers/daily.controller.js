const User = require("../models/User");
const Team = require("../models/Team");
const UserTeam = require("../models/UserTeam");
const DailyBoard = require("../models/DailyBoard");
const DailyContent = require("../models/DailyContent");

const { Op } = require("sequelize");

const { sign } = require("jsonwebtoken");
const { jwt } = require("../config/auth");

module.exports = {
  async index(req, res) {
    const { teamId, userId } = req.params;

    let leaderInTeam = await UserTeam.findOne({
      where: {
        team_id: teamId,
        is_leader: true,
      },
      attributes: ["id"],
      include: [
        {
          model: User,
          as: "user",
          where: {
            is_owner: false,
          },
          attributes: [],
        },
      ],
    });

    if (leaderInTeam) {
      leaderInTeam = leaderInTeam.dataValues.id;
    }

    let boards = await DailyBoard.findAll({
      where: {
        team_id: teamId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: DailyContent,
          as: "daily_contents",
          where: {
            user_id: {
              [Op.or]: [leaderInTeam, userId],
            },
          },
          attributes: ["user_id"],
          required: false,
        },
      ],
    });

    boards = boards.map((objectBoard) => {
      const dailyStatus = {
        leader_daily: false,
        your_daily: false,
      };

      const [dailyContents] = objectBoard.dataValues.daily_contents.map(
        (dailyContent) => {
          if (dailyContent.dataValues.user_id === leaderInTeam) {
            dailyStatus.leader_daily = true;
          }
          if (dailyContent.dataValues.user_id === Number(userId)) {
            dailyStatus.your_daily = true;
          }

          return dailyStatus;
        }
      );

      return {
        ...objectBoard.dataValues,
        daily_contents: dailyContents ? dailyContents : dailyStatus,
      };
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ boards, token });
  },

  async indexContent(req, res) {
    const { userId, boardId, teamId } = req.params;

    let dailyContents = await DailyContent.findAll({
      where: {
        daily_board_id: boardId,
      },
      attributes: {
        exclude: ["daily_board_id"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email", "image"],

          include: [
            {
              model: UserTeam,
              as: "user_isLeader",
              where: { team_id: teamId },
              attributes: ["is_leader"],
            },
          ],
        },
      ],
    });

    dailyContents = dailyContents.map((objectContent) => {
      const user = {
        id: objectContent.dataValues.user.dataValues.id,
        name: objectContent.dataValues.user.dataValues.name,
        email: objectContent.dataValues.user.dataValues.email,
        image: objectContent.dataValues.user.dataValues.image,
        is_leader:
          objectContent.dataValues.user.dataValues.user_isLeader[0].is_leader,
      };

      return {
        ...objectContent.dataValues,
        user,
      };
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ dailyContents, token });
  },

  async storeContent(req, res) {
    const { userId, boardId, teamId } = req.params;
    const { did_yesterday, do_today, problems } = req.body;

    const content = await DailyContent.create({
      user_id: userId,
      daily_board_id: boardId,
      did_yesterday,
      problems,
      do_today,
    });

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ content, token });
  },

  async store(req, res) {
    const { userId, teamId } = req.params;
    let startHourTodayDate = new Date();
    startHourTodayDate = startHourTodayDate.setHours(0, 0, 1);

    let finishHourTodayDate = new Date();
    finishHourTodayDate = finishHourTodayDate.setHours(23, 59, 59);

    const createdBoard = await DailyBoard.findOne({
      where: {
        team_id: teamId,
        created_at: {
          [Op.gte]: startHourTodayDate,
          [Op.lt]: finishHourTodayDate,
        },
      },
    });

    if (createdBoard) {
      return res
        .status(409)
        .json({ err: "There is already a daily board created today" });
    }

    let board = await DailyBoard.create({
      team_id: teamId,
    });

    board = {
      ...board.dataValues,
      daily_contents: {
        leader_daily: false,
        your_daily: false,
      },
    };

    const token = sign({}, jwt.secret, {
      subject: `${userId}`,
      expiresIn: jwt.expiresIn,
    });

    return res.json({ board, token });
  },

  async deleteBoard(req, res) {
    const { teamId, boardId } = req.params;

    await DailyBoard.destroy({
      where: {
        id: boardId,
        team_id: teamId,
      },
    });

    return res.status(204).send();
  },

  async deleteContent(req, res) {
    const { contentId, userId, boardId } = req.params;

    const isMyContent = await DailyContent.findOne({
      where: {
        id: contentId,
        user_id: userId,
        daily_board_id: boardId,
      },
    });

    if (!isMyContent) {
      return res.status(403).json({ err: "Access denied" });
    }

    await DailyContent.destroy({
      where: {
        id: contentId,
        user_id: userId,
        daily_board_id: boardId,
      },
    });

    return res.status(204).send();
  },
};
