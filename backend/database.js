const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nutech_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
