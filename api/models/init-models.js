var DataTypes = require("sequelize").DataTypes;
var _Items = require("./Items");
var _Users = require("./Users");
var _UserItems = require("./UserItems");
var _Weapons = require("./Weapons");
var _UserWeapons = require("./UserWeapons");
var _UserCharacters = require("./UserCharacters");
var _Characters = require("./Characters");

function initModels(sequelize) {
  var Items = _Items(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var UserItems = _UserItems(sequelize, DataTypes);
  var Weapons = _Weapons(sequelize, DataTypes);
  var UserWeapons = _UserWeapons(sequelize, DataTypes);
  var UserCharacters = _UserCharacters(sequelize, DataTypes);
  var Characters = _Characters(sequelize, DataTypes);

  return {
    Items,
    Users,
    UserItems,
    Weapons,
    UserWeapons,
    UserCharacters,
    Characters,
  };
}
module.exports = { initModels };
