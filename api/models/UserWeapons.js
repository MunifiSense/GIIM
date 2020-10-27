/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserWeapons', {
    user_weapon_id: {
      autoIncrement: true,
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
      unique: "UserWeapons_ibfk_1"
    },
    weapon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Weapons',
        key: 'weapon_id'
      },
      unique: "FK_UserWeapons_munimoe_GIIM.Weapons"
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    desired_Level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ascended: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'UserWeapons',
    timestamps: false
    });
};
