const {
  registerValidator,
  loginValidator,
  resetValidator,
} = require("../util/validator");
const {
  registerUser,
  loginUser,
  resetPassword,
} = require("../controllers/userController");

const router = require("express").Router();

router
  .post("/register", registerValidator, registerUser)
  .post("/login", loginValidator, loginUser)
  .post("/reset-password", resetValidator, resetPassword);

module.exports = router;
