const { registerValidator } = require("../config/validator");
const { registerUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", registerValidator, registerUser);

module.exports = router;
