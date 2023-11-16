const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

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
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

// @ description login user
// @ route POST api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email or password does not match");
  }
  const user = await User.findOne({ email });
  // if user is available we need to compare the password with the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      // jwt.sign is the method to create the accessToken and it takes three parameters (one is the payload, other is the secret key and third is the expiration time or date)
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @ description current user
// @ route POST api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
