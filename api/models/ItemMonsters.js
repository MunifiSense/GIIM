/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ItemMonsters', {
    item_monster_id: {
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
        unique: "FK__Items"
    },
    monster_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Monsters',
        key: 'monster_id'
      },
      unique: "FK__Monsters"
    }
  }, {
    sequelize,
    tableName: 'ItemMonsters',
    timestamps: false
    });
};
