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

    const { id: leaderInTeam } = await UserTeam.findOne({
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

    let boards = await DailyBoard.findAll({
      where: {
        team_id: teamId,
      },
      order: [
        ['createdAt']
      ],
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
};
