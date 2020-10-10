const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function database(req, res, next) {
    var db = mongoose.connect(
        "mongodb+srv://test:Bloom2020!@#$@cluster0.gri4u.mongodb.net/bloom?retryWrites=true&w=majority"
      ,{ useNewUrlParser: true, useUnifiedTopology: true },
      function (error) {
        if (error) return console.log(error);
  
        console.log("connection successful");
      }
    );
    var Schema = mongoose.Schema;
    const userSchema = new Schema({
      name: String,
      username: String,
      password: String,
      description: String,
      pfp: String, 
      comments: [{from: String, to: String, time: String, Content: String}],
    });


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});