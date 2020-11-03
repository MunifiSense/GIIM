const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const initModels = require("./init-models.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./Users.js")(sequelize, Sequelize);
db.Characters = require("./Characters.js")(sequelize, Sequelize);
db.Items = require("./Items.js")(sequelize, Sequelize);
db.Weapons = require("./Weapons.js")(sequelize, Sequelize);
db.UserCharacters = require("./UserCharacters.js")(sequelize, Sequelize);
db.UserItems = require("./UserItems.js")(sequelize, Sequelize);
db.UserWeapons = require("./UserWeapons.js")(sequelize, Sequelize);

db.Users.belongsToMany(db.Characters, {through: "UserCharacters", foreignKey: "user_id"});
db.Characters.belongsToMany(db.Users, {through: "UserCharacters", foreignKey: "character_id"});

db.Users.belongsToMany(db.Items, {through: "UserItems", foreignKey: "user_id"});
db.Items.belongsToMany(db.Users, {through: "UserItems", foreignKey: "item_id"});

db.Users.belongsToMany(db.Weapons, {through: "UserWeapons", foreignKey: "user_id"});
db.Weapons.belongsToMany(db.Users, {through: "UserWeapons", foreignKey: "weapon_id"});

module.exports = db;
