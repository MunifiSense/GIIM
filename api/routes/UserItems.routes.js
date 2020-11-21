module.exports = app => {
    const userItems = require("../controllers/UserItems.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve items with user id
    router.get("/:id", userItems.getUserItems);

    // Add items wtih user id
    router.post("/:id", userItems.addUserItems);

    // Update character with user id
    router.put("/", userItems.updateUserItem);
  
    app.use('/api/useritems', router);
  };