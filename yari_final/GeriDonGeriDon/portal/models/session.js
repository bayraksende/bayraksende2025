const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

const Session = sequelize.define('Session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cookie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bakiye: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'session',
  timestamps: false,
});

module.exports = Session;