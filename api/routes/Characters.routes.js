module.exports = app => {
    const characters = require("../controllers/Characters.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all characters
    router.get("/", characters.getAllCharacters);
  
    // Retrieve character with name
    router.get("/:name", characters.getCharacter);
  
    app.use('/api/characters', router);
  };