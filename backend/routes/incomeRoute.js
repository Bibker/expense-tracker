const { incomeValidator } = require("../config/validator");
const {
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const router = require("express").Router();

router
  .post("/", incomeValidator, addIncome)
  .get("/", getIncome)
  .get("/:id", getIncomeById)
  .patch("/:id", updateIncome)
  .delete("/:id", deleteIncome);

module.exports = router;
