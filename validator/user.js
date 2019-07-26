const Validator = require("validator");
const isEmpty = require("./isEmpty.js");

module.exports = function validateUserInput(data) {
let errors = {};
data.username = !isEmpty(data.username) ? data.username : "";
data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";

// post validation rules​
// validate alphanumeric username
if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username is not alphanumeric";
}

//validate username field not empty
if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
}

// validate email field not empty
if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required"; 
}

// validate password not empty
if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
}

// validate password by entering twice 
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
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