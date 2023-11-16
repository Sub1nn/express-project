const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader || authHeader.startsWith("bearer")) {
    token = authHeader.split(" ")[1];
    //now the jwt should be verified
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      //jwt.verify takes three params => the token, secret key and a callback function which handles the error and gives the decoded information if all ok.
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log(decoded);
    });
  }
});

module.exports = validateToken;
