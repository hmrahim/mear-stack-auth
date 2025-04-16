const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const errorFormatter = require("../utils/errorFormatter");
const jwt = require("jsonwebtoken");

exports.signupGetController = async (req, res, next) => {};



exports.signupPostController = async (req, res, next) => {

  
  const error = validationResult(req).formatWith(errorFormatter);
  if (!error.isEmpty()) {
    let err = error.mapped();
    return res.send(err);
  }
  try {
    const { username, name, email, password } = req.body;
    let hashPassword = await bcrypt.hash(password, 11);
    const user = new User({
      username,
      name,
      email,
      password: hashPassword,
    });

    const createdUser = await user.save();
    return res.send(createdUser);
  } catch (error) {
    console.log(error);
  }





};
exports.loginGetController = (req, res, next) => {};

exports.loginPostCotroller = async (req, res, next) => {

  
  const { email, password } = req.body;
  const error = validationResult(req).formatWith(errorFormatter);
  if (!error.isEmpty()) {
    const err = error.mapped();
    return res.send(err);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        message: "Email is incorrect",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json({
        message: "Password is incorrect",
      });
    }

    const payload = {
      id: user._id,
      email: user.eail,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    return res.send({
      user: user,
      token:"Bearer " + token,
    });
  } catch (error) {
    console.log(error);
  }
};



exports.logoutController = (req, res, next) => {};
