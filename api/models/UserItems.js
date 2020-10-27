/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserItems', {
    user_item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      unique: "UserItems_ibfk_1"
    },
    item_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Items',
        key: 'item_id'
      },
      unique: "item"
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'UserItems',
    timestamps: false
    });
};
