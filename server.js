const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/content', { useNewUrlParser: true }
).then(
   () => {console.log("Connection Success")}, err => {console.log("naughty developer")}
);
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
const item = require("./routes/item.js");
const user = require("./routes/user.js");
app.use("/item", item);
app.use("/user", user);
app.listen(port, () => console.log('server running on port 5000'));
