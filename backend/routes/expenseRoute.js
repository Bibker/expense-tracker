const { incomeValidator } = require("../config/validator");
const {
  addExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = require("express").Router();

router
  .post("/", incomeValidator, addExpense)
  .get("/", getExpense)
  .get("/:id", getExpenseById)
  .patch("/:id", updateExpense)
  .delete(":/id", deleteExpense);

module.exports = router;
