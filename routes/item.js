const express = require("express");
const app = express();
const router = express.Router();
const newArr = new Array();
const lodash = require("lodash");
const item = require("../models/itemModel.js");

//@route POST content/create
//@desc CREATE some content
//@access public
router.post("/createPost", (req,res) => {
const post = new item ({
    username: req.body.username,
    content: req.body.content
 });
// Save returns a promise
post.save().then(() => res.send('complete'));
});

//@route GET content/read
//@desc READ content
//@access public
router.get("/getAll", (req,res) => {
   const errors = {};
    item.find()
    .then(items => {
        res.json(items);
    })
    .catch(err => res.status(404).json({ noItems:"There are no items"}));
});
   //@route PUT content/update
//@desc UPDATE some content
//@access public
// router.put("/update", (req,res) => {
// item.updateOne({

//     })
//     // await will wait for a promise.
// await item.save();
// });

//@route DELETE content/delete
//@desc DELETE some content
//@access public
router.delete("/delete", (req,res) => {
item.deleteOne({ "username": req.body.username })
.then(() => 
res.status(200).send("Successfully deleted"))
});
module.exports = router;