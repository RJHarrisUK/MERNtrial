const express = require("express");
const app = express();
const router = express.Router();
const newArr = new Array();
const lodash = require("lodash");
const user = require("../models/userModel.js");
const validateUserInput = require("../validator/user");
const bcrypt = require("bcryptjs");

//@route POST create user
//@desc registers a new user in database
//@access public
router.post("/registerUser", (req,res) => {
    const { errors, isValid } = validateUserInput(req.body);
// check input is correct via validator
    if (!isValid) {
        return res.status(400).json(errors);
      }
// check for duplicate existing usernames/emails 
        const newUser = new user ({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
// hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then(user => res.json({ message: "New user successfully registered" }))
              .catch(err => res.json({ message: "Username and/or e-mail already exists" }));
            });
        });
  });

//@route GET user
//@desc login a specific user
//@access public
router.post("/loginUser", (req, res) => {

    user.findOne({ username: req.body.username, email: req.body.email })
    .then(user => {
    if (!user) {
        return res.status(400).json({ message: "No such user exists" });
    } else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
                return res.status(400).json({ message: "User successfully logged in" });
            } else {
                res.json({ message: "Incorrect Password" });
            }
        });
    }
});
 });

//@route GET all users
//@desc test to see user logins work
//@access private
router.get("/getAllUsers", (req,res) => {
    const errors = {};
    user.find()
    .then(users => {
        if (!users) {
            errors.noUsers = "There are no users in the database";
            res.status(400).json(errors);
        }
        res.json(users);
    })
    .catch(err => res.status(400).json(err));
});

//@route PUT user
//@desc Update user document in database
//@access public

//@route DELETE user
//@desc remove user from database
//@access public

module.exports = router;