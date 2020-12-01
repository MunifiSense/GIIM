/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
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
