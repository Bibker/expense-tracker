const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { validationResult } = require("express-validator");
const { sendMail } = require("../util/mailer");
const EMAIL_SENDER = process.env.EMAIL_SENDER;

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already Exist");
  }

  const createUser = await User.create({
    name,
    email,
    password,
  });

  if (createUser) {
    res.status(201).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      pic: createUser.pic,
      token: generateToken(createUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Unable to register user.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
      validTill: `30 Days`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password.");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  const { email } = req.body;

  const mailOptions = {
    from: `Expense Tracker <${EMAIL_SENDER}>`,
    to: email,
    subject: "Password Reset Link",
    text: "Your Password reset link is ...",
    html: "<h1>Your Password reset link is ...<h1>",
  };

  const result = await sendMail(mailOptions);

  res.send(result);
});

module.exports = { registerUser, loginUser, resetPassword };
