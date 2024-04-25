const { check } = require("express-validator");

const registerValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required").not().isEmpty(),
];

const loginValidator = [
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check("password", "Password is required").not().isEmpty(),
];

const resetValidator = [
  check("email", "Please enter a valid email").isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
];

const incomeValidator = [
  check("title", "Please enter  title").not().isEmpty(),
  check("amount", "Please enter  amount").not().isEmpty(),
  check("category", "Please choose  category").not().isEmpty(),
  check("description", "Please enter  description").not().isEmpty(),
  check("date", "Please choose  date").not().isEmpty(),
];

module.exports = {
  registerValidator,
  loginValidator,
  resetValidator,
  incomeValidator,
};
