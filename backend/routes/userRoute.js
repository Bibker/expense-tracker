const {
  registerValidator,
  loginValidator,
  forgotValidator,
} = require("../util/validator");
const {
  registerUser,
  loginUser,
  forgotPassword,
} = require("../controllers/userController");

const router = require("express").Router();

router
  .post("/register", registerValidator, registerUser)
  .post("/login", loginValidator, loginUser)
  .post("/forgot-password", forgotValidator, forgotPassword);

module.exports = router;
