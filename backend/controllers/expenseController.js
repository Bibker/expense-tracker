const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
const { validationResult } = require("express-validator");

const addExpense = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user.id;
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
    addedBy: userId,
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
  const userId = req.user.id;
  const expenseRecords = await Expense.find({ addedBy: userId }).sort({
    createdAt: -1,
  });
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
  const userId = req.user.id;

  const expenseRecord = await Expense.findOne({ _id: id, addedBy: userId });
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
  const userId = req.user.id;

  const updateExpenseRecord = await Expense.findOneAndUpdate(
    { _id: id, addedBy: userId },
    req.body,
    {
      new: true,
    }
  );
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
  const userId = req.user.id;

  const deletedExpense = await Expense.findOneAndDelete({
    _id: id,
    addedBy: userId,
  });
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
