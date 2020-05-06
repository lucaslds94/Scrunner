const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Users = require('../models/Users');
const Teams = require('../models/Teams');
const UserTeams = require('../models/UserTeams');

const connection = new Sequelize(dbConfig);

Users.init(connection);
Teams.init(connection);
UserTeams.init(connection);

UserTeams.associate(connection.models);


module.exports = connection;