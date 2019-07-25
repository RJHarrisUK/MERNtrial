const Validator = require("validator");
const isEmpty = require("./isEmpty.js");

module.exports = function validatePost(data) {
let errors = {};
data.username = !isEmpty(data.username) ? data.username : "";
data.content = !isEmpty(data.content) ? data.content : "";
data.email = !isEmpty(data.email) ? data.email : "";

// post validation rules​
// validate alphanumeric username
if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username is not alphanumeric";
}

//validate username field not empty
if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
}

// validate content field not empty
if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required"; 
}

// validate email not empty
if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
}
// validate email correct format
if (!Validator.isEmail(data.email)) {
    errors.email = "Please enter a valid e-mail";
}

return {
    errors,
    isValid: isEmpty(errors)
};
}