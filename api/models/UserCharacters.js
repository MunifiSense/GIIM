/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserCharacters', {
    user_character_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      unique: "FK_UserCharacters_Users"
    },
    character_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Characters',
        key: 'character_id'
      },
      unique: "UserCharacters_ibfk_1"
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
    },
    normal_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    normal_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    q_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    q_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    e_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    },
    e_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'UserCharacters',
    timestamps: false
    });
};