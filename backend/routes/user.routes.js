module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();

    // --- BASIC CRUD ENDPOINTS --- //

    // Create a new Tutorial
    router.post("/", users.create);
  
    // Retrieve all Tutorials - create conditions in post body
    router.post("/", users.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", users.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAll);
  

    // --- LOGIN ENDPOINTS --- //

    // check login - queries DB and returns boolean value true or false depending on if username + password match
    router.post("/login", users.checkLogin);


    app.use('/api/users', router);
  };