const { Model, DataTypes } = require("sequelize");

class DailyContent extends Model {
  static init(sequelize) {
    super.init(
      {
        did_yesterday: {
          type: DataTypes.STRING(255),
        },
        do_today: {
          type: DataTypes.STRING(255),
        },
        problems: {
          type: DataTypes.STRING(255),
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        daily_board_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "daily_boards",
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
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    this.belongsTo(models.DailyBoard, {
      foreignKey: "daily_board_id",
      as: "daily_board",
    });
  }
}

module.exports = DailyContent;
