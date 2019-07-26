const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const userSchema = new Schema ({
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

const user = mongoose.model('User', userSchema);
module.exports = userSchema;
module.exports = user;