const { body } = require("express-validator");
const User = require("../models/User");

const signupValidator = [
  body("username")
    .isLength({ min: 5, max: 30 })
    .withMessage("Username must be 5 to 30 carracter")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username is alreadly exist");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email is already exist");
      }
    })
    .trim()
    .normalizeEmail(),
    body("password")
    .isLength({min:5})
    .withMessage("Password must be minmum 5 carracter"),
    body("confirmPassword")
    .custom((confirmPassword,{req})=> {
        if(confirmPassword !== req.body.password){
            throw new Error("Passowrd dose not match")
        }
        return true

    })


];

module.exports = signupValidator


