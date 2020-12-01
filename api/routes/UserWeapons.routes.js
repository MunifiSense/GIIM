module.exports = app => {
  const userWeapons = require("../controllers/UserWeapons.controller.js");
  const auth = require("../controllers/Auth.controller.js");
  
  var router = require("express").Router();

  // Retrieve weapon with user id
  router.get("/", auth.authenticate, userWeapons.getUserWeapons);

  // Add weapon wtih user id
  router.post("/", auth.authenticate, userWeapons.addUserWeapon);

  // Update weapon with user id
  router.put("/", auth.authenticate, userWeapons.updateUserWeapon);

  // Delete weapon with user id
  router.delete("/:weaponid", auth.authenticate, userWeapons.removeUserWeapon);

  app.use('/api/userweapons', router);
};