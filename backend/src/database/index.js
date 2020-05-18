const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Team = require('../models/Team');
const UserTeam = require('../models/UserTeam');
const DailyBoard = require('../models/DailyBoard');
const DailyContent = require('../models/DailyContent');
const TaskBoard = require('../models/TaskBoard');
const Task = require('../models/Task');
const TaskColumn = require('../models/TaskColumn');

const connection = new Sequelize(dbConfig);

User.init(connection);
Team.init(connection);
UserTeam.init(connection);
DailyBoard.init(connection);
DailyContent.init(connection);
TaskBoard.init(connection);
Task.init(connection);
TaskColumn.init(connection);

User.associate(connection.models);
Team.associate(connection.models);
UserTeam.associate(connection.models);
DailyBoard.associate(connection.models);
DailyContent.associate(connection.models);
TaskBoard.associate(connection.models);
Task.associate(connection.models);
TaskColumn.associate(connection.models);

module.exports = connection;