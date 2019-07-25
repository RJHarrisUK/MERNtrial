// imports
const express = require("express");
const router = express.Router();
const lodash = require("lodash");
const item = require("../models/itemModel.js");
const validatePost = require("../validator/item.js");
const bcrypt = require("bcryptjs");
const arr = new Array();

//@route POST content/create
//@desc CREATE some content
//@access public
router.post("/createPost", (req,res) => {
    const valid = validatePost(req.body);
    if (!valid.isValid) {
        return res.status(400).json(valid.errors);
    }
    const post = new item ({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
     });
     bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(post.email, salt, (err, hash) => {
          if (err) throw err;
          post.email = hash;
          post.save().then(() =>
          res.send("Successfully posted"))
          .catch(err => res.status(404).json(err));
        });
});
});

 //   const { errors, isValid } = validateItemInput(req.body);
 //   if (!isValid) {

//@route GET content/read
//@desc READ content
//@access public
router.get("/getAll", (req,res) => {
    item.find({} 
        , '-email -__v'
        )
    .then(items => {
        if (!items) {
            errors.noItems = "There are no items";
            res.status(404).json(errors);
        }
        res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

//@route PUT content/update
//@desc UPDATE some content
//@access public
router.put("/update", (req,res) => {
    bcrypt.compare(req.body.email, hash, function(err, res) {
        if (err) throw err;
        post.email = hash;
        item.updateOne({"email": req.body.email},
        {$set: {"content": req.body.content}})
        .then(() => 
        res.send("Updated")
        .catch(err => res.status(404).json(err))
        );
});
});

//@route DELETE content/delete
//@desc DELETE some content
//@access public
router.delete("/deleteItem", (req, res) => {

    let errors = {};
    const email = req.body.email;
    const id = req.body._id;
  
    item.findById(id).then(item => {
  
      bcrypt.compare(email, item.email).then(isMatch => {
        if (isMatch) {
          item
            .remove()
            .then(() => {
              res.json({ success: true });
            })
            .catch(err =>
              res.status(404).json({ itemnotfound: "No item found" })
            );
        } else {
          errors.email = "Email Incorrect";
          return res.status(400).json(errors);
        }
      });
    }).catch(err => res.status(404).json({ noItem: "There is no item with this ID" }));
  });

module.exports = router;