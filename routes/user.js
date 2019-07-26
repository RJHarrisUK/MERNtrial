const express = require("express");
const app = express();
const router = express.Router();
const newArr = new Array();
const lodash = require("lodash");
const user = require("../models/userModel.js");

const validateUserInput = require("../validator/user");

//@route POST create user
//@desc registers a new user in database
//@access public
router.post("/registerUser", (req,res) => {
    const { errors, isValid } = validateUserInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
      }
    const newUser = new user ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
     });
    // Save returns a promise
    newUser.save().then(() => res.send('User successfully registered'));
    });

//@route GET user
//@desc login a specific user
//@access public
router.post("/loginUser", (req, res) => {
    const errors = {};
    user.findOne({ username: req.body.username, password: req.body.password })
    .then(user => {
        if (user) {
        return res.status(400).json({ email: "User successfully logged in" });
        } else {
        errors.noUsers = "Please enter correct credentials";
        res.status(404).json(errors);}
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