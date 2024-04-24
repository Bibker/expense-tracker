const { incomeValidator } = require("../config/validator");
const {
  addExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router
  .post("/", isAuthenticated, incomeValidator, addExpense)
  .get("/", isAuthenticated, getExpense)
  .get("/:id", isAuthenticated, getExpenseById)
  .patch("/:id", isAuthenticated, updateExpense)
  .delete("/:id", isAuthenticated, deleteExpense);

module.exports = router;
