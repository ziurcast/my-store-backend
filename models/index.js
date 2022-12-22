const { User, UserScheme } = require('./user.model');

const setupModels = (sequelize) => {
  User.init(UserScheme, User.config(sequelize));
};

module.exports = setupModels;
