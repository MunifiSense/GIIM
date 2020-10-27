/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Items', {
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    item_group: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    rarity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Items',
    timestamps: false
    });
};
