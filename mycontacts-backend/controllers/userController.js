const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// @ description register a user
// @ route POST api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email }); //It helps to find the user with the email which is already in the database
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Now we can register the user
  // The user is using a raw password which should be changed to a hashed password using a library called bcrypt
  const hashedPassword = await bcrypt.hash(password, 10); //we need to provide the raw password and 10 is the number of salt rounds (cost factor) that we want for hashing of the password. Higher number of rounds increases the amount of time it takes to compute the hash.
  console.log("Hashed Password: ", hashedPassword);
  res.json({ message: "Register the user" });
});

// @ description login user
// @ route POST api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

// @ description current user
// @ route POST api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
