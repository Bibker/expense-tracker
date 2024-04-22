const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
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

module.exports = { registerUser };
