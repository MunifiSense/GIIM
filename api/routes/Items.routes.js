module.exports = app => {
    const items = require("../controllers/Items.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all items
    router.get("/", items.getAllItems);
  
    app.use('/api/items', router);
  };