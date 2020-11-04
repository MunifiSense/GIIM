module.exports = app => {
    const weapons = require("../controllers/Weapons.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all weapons
    router.get("/", weapons.getAllWeapons);
  
    // Retrieve weapon with name
    router.get("/:name", weapons.getWeapon);
  
    app.use('/api/weapons', router);
  };