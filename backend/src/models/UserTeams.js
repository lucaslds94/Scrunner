const { Model, DataTypes } = require('sequelize');

class UserTeams extends Model {
  static init(sequelize){
    super.init({
      is_leader: {
        type: DataTypes.ENUM("F","T")
      },
      users_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      teams_id: {
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
    this.belongsTo(models.Users, 
    {
      foreignKey:'users_id',
      as: 'fk_user_teams_users' 
    });
       
    this.belongsTo(models.Teams,
    { 
      foreignKey:'teams_id',
      as: 'fk_user_teams_teams' 
    });
  }
}

module.exports = UserTeams;
