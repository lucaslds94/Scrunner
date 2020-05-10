const { Model, DataTypes } = require('sequelize');

class TaskBoard extends Model {

    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            teams_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "teams", key: "id" },  
            }

        },{
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.Team, {
            foreignKey: 'teams_id',
            as: 'fk_task_board_teams'
        })
    }

}

module.exports = TaskBoard;