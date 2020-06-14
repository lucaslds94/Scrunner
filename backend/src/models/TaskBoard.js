const { Model, DataTypes } = require('sequelize');

class TaskBoard extends Model {

    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            date_range: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total_task_points: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
                allowNull: false    
            },
            team_id: {
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
            foreignKey: 'team_id',
            as: 'team'
        })
        this.hasMany(models.Task, {
            foreignKey: 'task_board_id',
            as: 'tasks'
        })
    }

}

module.exports = TaskBoard;