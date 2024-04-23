const { check } = require("express-validator");

const registerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required").not().isEmpty(),
];
const incomeValidator = [
  check("title", "Please enter income title").not().isEmpty(),
  check("amount", "Please enter income amount").not().isEmpty(),
  check("category", "Please choose income category").not().isEmpty(),
  check("description", "Please enter income description").not().isEmpty(),
  check("date", "Please choose income date").not().isEmpty(),
];

module.exports = { registerValidator, incomeValidator };
