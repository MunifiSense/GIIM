/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ItemDomains', {
    item_domain_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    item_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'Items',
          key: 'item_id'
        },
        unique: "FK_ItemDomains_Items"
    },
    domain_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Domains',
        key: 'domain_id'
      },
      unique: "FK_ItemDomains_Domains"
    },
    day_of_week1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    day_of_week2: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'ItemDomains',
    timestamps: false
    });
};
