/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(2048),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Users',
    timestamps: false
    });
};
