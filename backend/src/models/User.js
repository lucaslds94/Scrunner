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
        type: DataTypes.STRING(255)
      },
      is_owner: {
        type: DataTypes.ENUM("F", "T")
      },
      image: {
        type: DataTypes.STRING(500)
      },
    },{
      sequelize,
    })
  }
}

module.exports = User;

