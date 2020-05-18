const { Model, DataTypes } = require('sequelize');

class Team extends Model {
  static init(sequelize){
    super.init({
      name: {
        type: DataTypes.STRING(100)
      },
      code: {
        type: DataTypes.STRING(50)
      },
      category:  {
        type: DataTypes.STRING(50)
      },
    },{
      sequelize
    })
  }

  static associate(models){
    this.belongsToMany(models.User, {
      foreignKey: 'team_id',
      through: 'user_teams',
      as: 'users'
    });
    this.hasMany(models.DailyBoard, {
      foreignKey: 'team_id',
      as: 'daily_boards'
    });
    this.hasMany(models.TaskBoard, {
      foreignKey: 'team_id',
      as: 'task_boards'
    });
  }
}

module.exports = Team;
