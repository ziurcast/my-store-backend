const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../models');

const user = encodeURIComponent(config.dbUser);
const password = encodeURIComponent(config.dbPassword);
const uri = `postgres://${user}:${password}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(uri, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
