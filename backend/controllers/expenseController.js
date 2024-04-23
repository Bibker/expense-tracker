const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const { validationResult } = require("express-validator");

const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const createExpense = await Expense.create({
    title,
    amount,
    category,
    description,
    date,
  });

  if (createExpense) {
    return res.status(201).json({
      success: true,
      message: "Expense added successfully.",
      data: createExpense,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add expense.");
  }
});

const getExpense = asyncHandler(async (req, res) => {
  const expenseRecords = await Expense.find().sort({ createdAt: -1 });
  if (expenseRecords) {
    return res.status(200).json({
      success: true,
      message: "Expenses fetched successfully.",
      data: expenseRecords,
    });
  } else {
    res.status(400);
    throw new Error("Expense record not found.");
  }
});

const getExpenseById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const expenseRecord = await Expense.findById(id);
  if (expenseRecord) {
    return res.status(200).json({
      success: true,
      message: "Expense fetched successfully.",
      data: expenseRecord,
    });
  } else {
    res.status(400);
    throw new Error("Expense record not found.");
  }
});

const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateExpenseRecord = await Expense.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updateExpenseRecord) {
    return res.status(200).json({
      success: true,
      message: "Expense updated successfully.",
      data: updateExpenseRecord,
    });
  } else {
    res.status(400);
    throw new Error("Unable to update the expense record.");
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedExpense = await Expense.findByIdAndDelete(id);
  if (deletedExpense) {
    return res.status(200).json({
      success: true,
      message: "Expense deleted succesfully.",
      data: deletedExpense,
    });
  } else {
    res.status(400);
    throw new Error("Unable to delete the expense record.");
  }
});

module.exports = {
  addExpense,
  getExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
