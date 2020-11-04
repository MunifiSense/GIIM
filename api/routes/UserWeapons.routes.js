module.exports = app => {
    const userWeapons = require("../controllers/UserWeapons.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve weapon with user id
    router.get("/:id", userWeapons.getUserWeapons);

    // Add weapon wtih user id
    router.post("/", userWeapons.addUserWeapon);

    // Update weapon with user id
    router.put("/", userWeapons.updateUserWeapon);

    // Delete weapon with user id
    router.delete("/:id", userWeapons.removeUserWeapon);
  
    app.use('/api/userweapons', router);
  };