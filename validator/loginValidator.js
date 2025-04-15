const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Please provide a valid email address")
    .normalizeEmail()
    .trim(),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Password must be minimum 5 carracter"),
];

module.exports = loginValidator;
