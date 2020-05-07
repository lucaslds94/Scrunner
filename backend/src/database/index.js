const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Team = require('../models/Team');
const UserTeam = require('../models/UserTeam');
const DailyBoard = require('../models/DailyBoard');

const connection = new Sequelize(dbConfig);

User.init(connection);
Team.init(connection);
UserTeam.init(connection);
DailyBoard.init(connection);

UserTeam.associate(connection.models);
DailyBoard.associate(connection.models);


module.exports = connection;