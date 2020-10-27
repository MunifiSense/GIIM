/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserCharacters', {
    user_character_id: {
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
      unique: "UserCharacters_ibfk_2"
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
      allowNull: false
    },
    desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ascended: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    normal_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    normal_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    q_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    q_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    e_atk_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    e_atk_desired_level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'UserCharacters',
    timestamps: false
    });
};
