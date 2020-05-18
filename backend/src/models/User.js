const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize){
    super.init({
      name: {
        type: DataTypes.STRING(100)
      },
      email: {
        type: DataTypes.STRING(100) 
      },
      password: {
        type: DataTypes.STRING(256)
      },
      is_owner: {
        type: DataTypes.BOOLEAN
      },
      image: {
        type: DataTypes.STRING(500)
      },
      is_active: {
        type: DataTypes.BOOLEAN
      },
    },{
      sequelize,
    })
  }

  static associate(models){
    this.belongsToMany(models.Team, {
      foreignKey: 'user_id',
      through: 'user_teams',
      as: 'teams'
    });
    this.hasMany(models.DailyContent, {
      foreignKey: 'user_id',
      as: 'daily_contents'
    });
    this.hasMany(models.Task, {
      foreignKey: 'user_id',
      as: 'tasks'
    });
    this.hasMany(models.UserTeam, {
      foreignKey: 'user_id',
      as: 'user_isLeader'
    });
  }
  
}

module.exports = User;

