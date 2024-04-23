const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModel");
const { validationResult } = require("express-validator");

const addIncome = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const createIncome = await Income.create({
    title,
    amount,
    category,
    description,
    date,
  });

  if (createIncome) {
    return res.status(201).json({
      success: true,
      message: "Income added successfully.",
      data: createIncome,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add income.");
  }
});

const getIncome = asyncHandler(async (req, res) => {
  const incomeRecords = await Income.find().sort({ createdAt: -1 });
  if (incomeRecords) {
    return res.status(200).json({
      success: true,
      message: "Incomes fetched successfully.",
      data: incomeRecords,
    });
  } else {
    res.status(400);
    throw new Error("Income record not found.");
  }
});

const getIncomeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const incomeRecord = await Income.findById(id);
  if (incomeRecord) {
    return res.status(200).json({
      success: true,
      message: "Income fetched successfully.",
      data: incomeRecord,
    });
  } else {
    res.status(400);
    throw new Error("Income record not found.");
  }
});

const updateIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updateIncomeRecord = await Income.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updateIncomeRecord) {
    return res.status(200).json({
      success: true,
      message: "Income updated successfully.",
      data: updateIncomeRecord,
    });
  } else {
    res.status(400);
    throw new Error("Unable to update the income record.");
  }
});

const deleteIncome = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedIncome = await Income.findByIdAndDelete(id);
  if (deletedIncome) {
    return res.status(200).json({
      success: true,
      message: "Income deleted succesfully.",
      data: deletedIncome,
    });
  } else {
    res.status(400);
    throw new Error("Unable to delete the income record.");
  }
});

module.exports = {
  addIncome,
  getIncome,
  getIncomeById,
  updateIncome,
  deleteIncome,
};
