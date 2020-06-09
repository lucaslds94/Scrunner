const { Model, DataTypes } = require("sequelize");

class TaskColumn extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(45),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, {
      foreignKey: "task_column_id",
      as: "tasks",
    });
  }
}

module.exports = TaskColumn;
