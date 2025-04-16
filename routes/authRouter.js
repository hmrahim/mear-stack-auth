const router = require("express").Router();
const {
  signupPostController,
  signupGetController,
  loginGetController,
  loginPostCotroller,
  logoutController,
  profileGetController,
} = require("../controllers/authController");
const loginValidator = require("../validator/loginValidator");
const signupValidator = require("../validator/signupValidator");


router.get("/signup",signupGetController)

router.post("/signup",signupValidator,signupPostController)
router.post("/login",loginValidator,loginPostCotroller)


module.exports = router;
