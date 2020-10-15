const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();


// creating express stuff
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// connecting to MongoDB
const db = require("./models");

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});