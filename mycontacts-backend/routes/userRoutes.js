const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

//register endpoint to register the user
router.post("/register", registerUser);

//login endpoint for the users to login
router.post("/login", loginUser);

// endpoint for logging in the current user
router.get("/current", validateToken, currentUser);

module.exports = router;
