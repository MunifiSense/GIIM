/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Monsters', {
    monster_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "Regular"
      }
  }, {
    sequelize,
    tableName: 'Monsters',
    timestamps: false
    });
};
