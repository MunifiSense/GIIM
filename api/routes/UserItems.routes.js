module.exports = app => {
    const userItems = require("../controllers/UserItems.controller.js");
    const auth = require("../controllers/Auth.controller.js");
    
    var router = require("express").Router();
  
    // Retrieve items with user id
    router.get("/", auth.authenticate, userItems.getUserItems);

    // Add items wtih user id
    router.post("/", auth.authenticate, userItems.addUserItems);

    // Update character with user id
    router.put("/", auth.authenticate, userItems.updateUserItem);
  
    app.use('/api/useritems', router);
  };