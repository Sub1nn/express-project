const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const router = express.Router();

//register endpoint to register the user
router.post("/register", registerUser);

//login endpoint for the users to login
router.post("/login", loginUser);

// endpoint for logging in the current user
router.post("/current", currentUser);

module.exports = router;
