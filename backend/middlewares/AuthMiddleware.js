







// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   console.log("Access Token Received:", accessToken); // Log to check if the token is coming through

//   if (!accessToken) return res.json({ error: "User not logged in!" });

//   try {
//     const validToken = verify(accessToken, "importantsecret");

//     if (validToken) {
//       return next();
//     }
//   } catch (err) {
//     return res.json({ error: err });
//   }
// };

// module.exports = { validateToken };


// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   if (!accessToken) {
//     return res.json({ error: "User not logged in!" });
//   }

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     req.user = validToken;//ep10
//     if (validToken) {
//       return next();
//     } else {
//       return res.json({ error: "Invalid token!" });
//     }
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = { validateToken };




// AuthMiddleware.js

import jwt from 'jsonwebtoken';  // Import the entire jsonwebtoken module
const { verify } = jwt;  // Destructure the 'verify' function

// Middleware to validate JWT
export const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    console.log("Decoded Token:", validToken); // Log the decoded token to verify its structure

    req.user = validToken; // Attach the entire decoded token to req.user
    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error verifying token:", err); // Log the error if token verification fails
    return res.json({ error: "Invalid or expired token" });
  }
};


