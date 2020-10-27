/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Characters', {
    character_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    rarity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    element: {
      type: DataTypes.STRING(10),
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
    asc_item_specialty: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    asc_item_common: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    item_talent: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    item_talent_common: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    item_talent_boss: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Characters',
    timestamps: false
    });
};
