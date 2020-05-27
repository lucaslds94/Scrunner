const { Model, DataTypes } = require("sequelize");

class DailyBoard extends Model {
  static init(sequelize) {
    super.init(
      {
        team_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Teams",
            key: "id",
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Team, {
      foreignKey: "team_id",
      as: "team",
    });
    this.hasMany(models.DailyContent, {
      foreignKey: "daily_board_id",
      as: "daily_contents",
    });
  }
}

module.exports = DailyBoard;
