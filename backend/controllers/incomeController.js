const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModel");
const { validationResult } = require("express-validator");

const addIncome = asyncHandler(async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const createIncome = await Income.create({
    title,
    amount,
    category,
    description,
    addedBy: userId,
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
  const userId = req.user.id;
  const incomeRecords = await Income.find({ addedBy: userId }).sort({
    createdAt: -1,
  });
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
  const userId = req.user.id;

  const incomeRecord = await Income.findOne({ _id: id, addedBy: userId });
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
  const userId = req.user.id;

  const updateIncomeRecord = await Income.findOneAndUpdate(
    { _id: id, addedBy: userId },
    req.body,
    {
      new: true,
    }
  );
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
  const userId = req.user.id;

  const deletedIncome = await Income.findOneAndDelete({
    _id: id,
    addedBy: userId,
  });
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
