const { Model, DataTypes } = require('sequelize');

class UserTeam extends Model {
  static init(sequelize){
    super.init({
      is_leader: {
        type: DataTypes.BOOLEAN
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      team_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      }
    },{
      sequelize
    })
  }

  static associate(models){
    this.belongsTo(models.User, 
    {
      foreignKey:'user_id',
      as: 'user' 
    });
       
    this.belongsTo(models.Team,
    { 
      foreignKey:'team_id',
      as: 'team' 
    });
  }
}

module.exports = UserTeam;