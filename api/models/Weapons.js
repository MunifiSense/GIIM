/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Weapons', {
    weapon_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    rarity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    weapon_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    asc_item_group: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    asc_item_group1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    asc_item_group2: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Weapons',
    timestamps: false
    });
};
