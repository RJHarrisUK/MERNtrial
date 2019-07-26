const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const contentSchema = new Schema ({
   username: String,
   content: {
       type: String,
       required: true,
       maxlength: 500
   }
});
const item = mongoose.model('Content', contentSchema);
module.exports = contentSchema;
module.exports = item;