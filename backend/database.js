const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nutech_test", "efyoudatabases", "Gresik12345!", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
