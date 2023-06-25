const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Barang = sequelize.define("Barang", {
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  harga_beli: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  harga_jual: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Barang;
