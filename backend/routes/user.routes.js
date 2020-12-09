module.exports = app => {
    const users = require("../controllers/user.controllers");

    var router = require("express").Router();
    const multer = require("multer")
    const path = require("path")

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '/uploads/'));
      },
      filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
      }
    });
    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
      } else {
          // rejects storing a file
          cb(null, false);
      }
    }
    
    const upload = multer({
      storage: storage,
      limits: {
          fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
    });

    // --- BASIC CRUD ENDPOINTS --- //

    // Create a new Tutorial
    router.post("/", users.createUser);
  
    // Retrieve all Tutorials - create conditions in post body
    router.post("/findUsers", users.findAllUsers);
  
  
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

    // --- COMMENTS ENDPOINTS --- //
    router.post("/addComment", users.addComment);

    router.post("/updateComment", users.updateComment);

    router.post("/deleteComment", users.deleteComment);

    // --- IMAGE ENDPOINTS --- //
    router.route("/updatePicture/:id").post(upload.single('image'), users.updatePicture);
    
    app.use('/api/users', router);
  };