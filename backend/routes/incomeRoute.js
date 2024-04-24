const { incomeValidator } = require("../config/validator");
const {
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router
  .post("/", isAuthenticated, incomeValidator, addIncome)
  .get("/", isAuthenticated, getIncome)
  .get("/:id", isAuthenticated, getIncomeById)
  .patch("/:id", isAuthenticated, updateIncome)
  .delete("/:id", isAuthenticated, deleteIncome);

module.exports = router;
