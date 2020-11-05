const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const db = require("../models");
const User = db.user;

// Users DB CRUD endpoints - create, findAll, findOne, update, delete, deleteAll

// Create and Save a new User
createUser = async (req, res) => {
  // Validate request - check missing name, username, pw, role
  if (!req.body.name || !req.body.username || !req.body.password || !req.body.role) {
    res.status(400).send({ message: "Content is missing key information for user!" });
    return;
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    pfp: req.body.pfp || "",
    comments: req.body.comments || [],
  });

  // Save User in the database
  await user
    .save(user)
    .then(data => {
      res.send(data.toJSON());
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database under condition described in body of request
findAllUsers = async (req, res) => {
    const condition = req.body || {}
  
    User.find(condition)
      .then(data => {
        res.send(data.map(data => data.toJSON()));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};

// Find a single User with an id
findUser = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data.toJSON());
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
};

// Update a User by the id in the request
updateUser = (req, res) => {
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
deleteUser = async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndRemove(id)
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
deleteAllUsers = async (req, res) => {
    await User.deleteMany({})
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


checkLogin = async (req, res) => {
  /*
  const usernameCredentials = {
    username: req.body.usernameOrEmail,
    password: req.body.password
  }
  const credentials = {
    email: req.body.usernameOrEmail,
    password: req.body.password
  }
  */
  console.log(req.body);
  // check credentials in DB
  const user = await User.findOne({
    $or: [{email: req.body.usernameOrEmail}, {username: req.body.usernameOrEmail}],
    password: req.body.password})
    .then(res => res)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  console.log(user);
  console.log()
  // check if username + password combo exist
  if (!user) {
    return res.status(200).json({login: false});
  }
  else {
    return res.status(200).json({login: true, id: user._id});
  }
}

register = (req, res) => {
  const info = req.body;
  // find if there is a user already registered with this username or email - if not, register user + return values

  const existingUser = User.findOne({$or: [
    {username: req.body.username},
    {email: req.body.email}
  ]}).then(data => {
    // if nothing found, register user
    if (!data) {
      // Validate request - check missing name, username, pw, role
      if (!req.body.name || !req.body.username || !req.body.password || !req.body.role) {
        res.status(400).send({ message: "Content is missing key information for user!" });
        return;
      }

      // Create a User
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        pfp: req.body.pfp || "",
        comments: req.body.comments || [],
      });

      // Save User in the database
      user
        .save(user)
        .then(data => {
          res.send(data.toJSON());
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while registering the User."
          });
        });
    }
    // if user found, return 303 error (see other to indicate that either username or email is already taken)
    else {
      res.status(303).send({ message: `User with username ${req.body.username} or email ${req.body.email} already exists.`})
    }
  }).catch(err => {
    res.status(500).send({ message: `Error checking registration for ${req.body.username}`});
  })

}

module.exports = {
  createUser,
  updateUser,
  findUser,
  findAllUsers,
  deleteUser,
  deleteAllUsers,
  checkLogin,
  register
}