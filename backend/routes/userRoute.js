const {
  registerValidator,
  loginValidator,
  forgotValidator,
  passwordValidator,
} = require("../util/validator");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  tokenVerifier,
} = require("../controllers/userController");

const router = require("express").Router();

router
  .post("/register", registerValidator, registerUser)
  .post("/login", loginValidator, loginUser)
  .post("/forgot-password", forgotValidator, forgotPassword)
  .get("/verify-token", tokenVerifier)
  .post("/reset-password", passwordValidator, resetPassword);

module.exports = router;
