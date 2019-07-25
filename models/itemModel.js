const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contentSchema = new Schema ({
   username: String,
   content: {
       type: String,
       required: true,
       maxlength: 500
   },
   email: {
       type: String,
       maxlength: 100
   }
});
const item = mongoose.model('Content', contentSchema);
module.exports = item;