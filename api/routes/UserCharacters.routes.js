module.exports = app => {
    const userCharacters = require("../controllers/UserCharacters.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve character with user id
    router.get("/:id", userCharacters.getUserCharacters);

    // Add character wtih user id
    router.post("/", userCharacters.addUserCharacter);

    // Update character with user id
    router.put("/", userCharacters.updateUserCharacter);

    // Delete character with user id
    router.delete("/", userCharacters.removeUserCharacter);
  
    app.use('/api/usercharacters', router);
  };