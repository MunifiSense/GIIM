/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserWeapons', {
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      unique: "FK_UserWeapons_Users",
      primaryKey: true
    },
    weapon_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Weapons',
        key: 'weapon_id'
      },
      unique: "FK_UserWeapons_DBNAME_GIIM.Weapons",
      primaryKey: true
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    ascended: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    ascend_next_max: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    managed: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'UserWeapons',
    timestamps: false
    });
};
