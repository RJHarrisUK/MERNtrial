const express = require("express");
const app = express();
const router = express.Router();
const newArr = new Array();
const lodash = require("lodash");
const item = require("../models/itemModel.js");
const user = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

//@route POST content/create
//@desc CREATE some content
//@access public
    router.post("/createPost", (req,res) => {

        user.findOne({ username: req.body.username })
    .then(user => {
    if (!user) {
        return res.status(400).json({ message: "No such user exists" });
    } else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (result == true) {
                const post = new item ({
                    username: req.body.username,
                    password: req.body.password,
                    content: req.body.content
                 });
                 post.save().then(item => res.send("Post created"));
            } else {
                res.send("Incorrect password");
            }
        });
    }
});
});

// router.post("/createPost", (req,res) => {
//     user.findOne({ username: req.body.username, email: req.body.email })
//     .then(user => {
//     if (!user) {
//         return res.status(400).json({ message: "No such user exists" });
//     } else {
// const post = new item ({
//     username: req.body.username,
//     password: req.body.password,
//     content: req.body.content
//  });
// // Save returns a promise
// post.save().then(() => res.send('complete'));
// });

//@route GET content/read
//@desc READ content
//@access public
router.get("/getAll", (req,res) => {
   const errors = {};
    item.find()
    .then(items => {
        if (!items) {
            errors.noItems = "There are no items";
            res.status(404).json(errors);
        }
        res.json(items);
    })
    .catch(err => res.status(404).json({ noItems:"There are no items" }));
});

//@route PUT content/update
//@desc UPDATE some content
//@access public
router.put("/update", (req,res) => {
    item.updateOne({"username": req.body.username},
    {$set: {"content": req.body.content}})
    .then(() => 
        res.send("updated")
    );
});

//@route DELETE content/delete
//@desc DELETE some content
//@access public
router.delete("/delete", (req,res) => {
item.deleteOne({ "username": req.body.username })
.then(() => 
res.status(200).send("Successfully deleted"))
});

module.exports = router;