const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// creating express stuff
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to MongoDB
const db = require("./models");

app.use(express.static(path.join(__dirname, '../build')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'), (err) => {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../build'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// sets up where to store post images

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/');
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
// router.route('/img_data')
// .post(upload.single('file'), function(req, res) {
//     var new_img = new Img;
//     new_img.img.data = fs.readFileSync(req.file.path)
//     new_img.img.contentType = 'image/jpeg';
//     new_img.save();
//     res.json({ message: 'New image added to the db!' });
// })




// require routes 
require("./routes/user.routes")(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
