const { Model, DataTypes } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        task_points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        task_board_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "task_boards",
            key: "id",
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        task_column_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "task_columns",
            key: "id",
          },
        },
        updated_at: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.TaskBoard, {
      foreignKey: "task_board_id",
      as: "task_board",
    });
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(models.TaskColumn, {
      foreignKey: "task_column_id",
      as: "task_column",
    });
  }
}

module.exports = Task;
