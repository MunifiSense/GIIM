module.exports = app => {
    const userCharacters = require("../controllers/UserCharacters.controller.js");
    const auth = require("../controllers/Auth.controller.js");

    var router = require("express").Router();
  
    // Retrieve character with user id
    router.get("/",  auth.authenticate, userCharacters.getUserCharacters);

    // Add character wtih user id
    router.post("/", auth.authenticate, userCharacters.addUserCharacter);

    // Update character with user id
    router.put("/", auth.authenticate, userCharacters.updateUserCharacter);

    // Delete character with user id
    router.delete("/:charid", auth.authenticate, userCharacters.removeUserCharacter);
  
    app.use('/api/usercharacters', router);
  };