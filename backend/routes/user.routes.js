module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();

    // --- BASIC CRUD ENDPOINTS --- //

    // Create a new Tutorial
    router.post("/", users.createUser);
  
    // Retrieve all Tutorials - create conditions in post body
    router.post("/", users.findAllUsers);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findUser);
  
    // Update a Tutorial with id
    router.put("/:id", users.updateUser);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.deleteUser);
  
    // Create a new Tutorial
    router.delete("/", users.deleteAllUsers);
  

    // --- LOGIN ENDPOINTS --- //

    // check login - queries DB and returns boolean value true or false depending on if username + password match
    router.post("/login", users.checkLogin);

    router.post("/register", users.register);

    app.use('/api/users', router);
  };