const { Model, DataTypes } = require('sequelize');

class DailyBoard extends Model {
  static init(sequelize){
    super.init({
      name: {
        type: DataTypes.STRING(100)
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
    this.belongsTo(models.Team,
    { 
      foreignKey:'teams_id',
      as: 'fk_user_teams_teams' 
    });
  }
}

module.exports = DailyBoard;