const { registerValidator, loginValidator } = require("../config/validator");
const { registerUser, loginUser } = require("../controllers/userController");

const router = require("express").Router();

router
  .post("/register", registerValidator, registerUser)
  .post("/login", loginValidator, loginUser);

module.exports = router;
