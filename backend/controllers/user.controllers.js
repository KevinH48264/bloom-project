const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const db = require("../models");
const User = db.user;

// Users DB CRUD endpoints - create, findAll, findOne, update, delete, deleteAll

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // missing name, username, pw, description
  else if (!req.body.name || !req.body.username || !req.body.password || !req.body.description) {
    res.status(400).send({ message: "Content is missing key information for user!" });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    description: req.body.description,
    pfp: req.body.pfp || "",
    comments: req.body.comments || [],
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database under condition described in body of request
exports.findAll = async (req, res) => {
    const condition = req.body || {}
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });  
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Find all published Users
exports.findAllUnderCondition = (req, res) => {
    User.find(req.body.condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.checkLogin = async (req, res) => {
  const credentials = req.body;

  // check credentials in DB
  const user = User.findOne(credentials)
    .then(res => res)
    .catch(err => {
      console.error(err);
    });
  
  // if username + password combo exist
  if (user) {
    return true;
  }
  else {
    return false;
  }
}