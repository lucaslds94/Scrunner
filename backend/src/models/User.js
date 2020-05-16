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
}

module.exports = User;

