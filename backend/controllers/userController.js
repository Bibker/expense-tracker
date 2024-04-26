const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { validationResult } = require("express-validator");
const { sendMail } = require("../util/mailer");
const jwt = require("jsonwebtoken");

const EMAIL_SENDER = process.env.EMAIL_SENDER;
const FRONTEND_URL = process.env.FRONTEND_URL;

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
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        pic: createUser.pic,
        token: generateToken(createUser._id),
      },
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
    return res.status(201).json({
      success: true,
      message: "User authenticated successfully.",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
        validTill: `30 Days`,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password.");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array(),
    });
  }
  const { email } = req.body;

  const registeredUser = await User.findOne({ email });
  if (email !== registeredUser.email) {
    return res.status(200).json({
      success: true,
      message:
        "If user is registered, a link to reset password has been sent to registered mail.",
    });
  }

  const oneTimeJwtSecret = process.env.JWT_SECRET + registeredUser.password;
  const payload = {
    email: registeredUser.email,
    id: registeredUser._id,
  };

  const passwordResetToken = jwt.sign(payload, oneTimeJwtSecret, {
    expiresIn: "1m",
  });

  const passwordResetLink = `${FRONTEND_URL}/reset-password/${registeredUser._id}/${passwordResetToken}`;
  const mailOptions = {
    from: `Expense Tracker <${EMAIL_SENDER}>`,
    to: email,
    subject: "Password Reset Link",
    text: `Your Password reset link is ${passwordResetLink}`,
    html: `<!DOCTYPE html><html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <meta charset="UTF-8"/> <meta name="viewport" content="width=device-width,initial-scale=1"/> <meta name="x-apple-disable-message-reformatting"/> <title>Password Reset</title> <style>table, td, div, h1, p{font-family: Arial, sans-serif;}.wrapper{display: flex; align-items: center; width: 100%; justify-content: space-between;}.header{background: #39B7E9; max-width: 540px; width: 100%; padding: 20px 30px; display: flex; color: white; align-items: center; justify-content: space-between; border-radius: 5px 5px 0 0;}.logo{height: auto; display: block; margin-bottom: 10px;}.main-content{padding: 42px 30px;}.main-content h1{font-size: 24px; margin: 0 0 20px 0; font-family: Arial, sans-serif;}.main-content p{margin: 0 0 20px 0; font-size: 16px; line-height: 24px; font-family: Arial, sans-serif;}.transaction-outline{margin-bottom: 20px;}.transaction-outline p{margin: 0;}.main-content a{color: #39B7E9; text-decoration: underline;}.action_container{display: flex; justify-content: center; padding: 20px 0;}.action_container a{background: #273B80; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;}.footer{padding: 30px; background: #273B80; color: #fff;}.footer p{margin: 0; font-size: 14px; line-height: 16px; font-family: Arial, sans-serif; color: #ffffff;}.social-icons{padding: 0; border-collapse: collapse; border: 0; border-spacing: 0;}.social-icons td{padding: 0 0 0 10px; width: 38px;}.social-icons a{width: 20px; height: 20px; background: #39B7E9; padding: 10px; font-size: 20px;}</style></head><body style="margin: 0; padding: 0;"> <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; background: #ffffff;"> <tr> <td align="center" style="padding-top: 40px;"> <table role="presentation" style="width: 602px; border-collapse: collapse; border-spacing: 0; text-align: left;"> <tr> <td align="center" class="header"> <div class="wrapper"> <div> <h1 style="font-size:25px; text-align:start;">Expense Tracker - Password Reset</h1> </div><div class=""></div></div></td></tr><tr> <td class="main-content"> <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;"> <tr> <td style="padding: 0 0 36px 0; color: #153643;"> <h1 style="margin-bottom:20px;">Hello ${registeredUser.name},</h1> <p>We want to let you know that we've received request for a password reset.<br>Click button below to reset your password.</p><p style="align:center;"><a href="${passwordResetLink}" style="background-color: #39B7E9;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;border-radius: 10px;">Reset Password</a></p><p>This link is valid for <b>5 minutes</b> and can only be used once.</p><p><i>Note: If the above button doesn't work,use the below link:</i></p>${passwordResetLink}<p/> <div> <p style="margin-bottom:0">Best Regards,</p><p style="font-weight:bold; margin-bottom:5px">The Expense Tracker Team</p></div></td></tr></table> </td></tr></table> </td></tr></table></body></html>`,
  };

  sendMail(mailOptions).then((result) => {
    res.status(200).json({
      success: true,
      message:
        "If user is registered, a link to reset password has been sent to registered mail.",
    });
  });
});

module.exports = { registerUser, loginUser, forgotPassword };
