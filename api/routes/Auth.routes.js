module.exports = app => {
    var router = require("express").Router();
    const auth = require("../controllers/Auth.controller.js");
    const users = require("../controllers/Users.controller.js");
  
    // Add character wtih user id
    router.post("/", auth.authenticate, users.addUser);

  
    app.use('/api/auth', router);
  };