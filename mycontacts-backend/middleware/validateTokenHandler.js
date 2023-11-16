const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader || authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //now the jwt should be verified
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      //jwt.verify takes three params => the token, secret key and a callback function that will be called after the verification process is complete which handles the error and gives the decoded information.
      //decoded contains the payload of the token. In this case, the payload contains a property named user.
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      //If the token is successfully verified, the decoded payload is assigned to req.user.
      req.user = decoded.user;
      next(); // the next() function indicates that the middleware has completed its operation, and the request can be passed to the next middleware or route handler in the chain.
    });

    if (!token) {
      res.status(401);
      throw new Error(
        "User is not authorized or token is missing in the request"
      );
    }
  }
});

module.exports = validateToken;
