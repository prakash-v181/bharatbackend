import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

// 🔐 Protect routes (user must be logged in)
const protect = asyncHandler(async (req, res, next) => {
  let token

  // ✅ Safely read JWT from HTTP-only cookie
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt

    try {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach user to request (exclude password)
      req.user = await User.findById(decoded.userId).select('-password')

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// 🔐 Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

export { protect, admin }




// import jwt from 'jsonwebtoken';
// import asyncHandler from './asyncHandler.js';
// import User from '../models/userModel.js';

// // User must be authenticated
// const protect = asyncHandler(async (req, res, next) => {
//   let token;

//   // Read JWT from the 'jwt' cookie
//   token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.userId).select('-password');

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, no token');
//   }
// });

// // User must be an admin
// const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(401);
//     throw new Error('Not authorized as an admin');
//   }
// };

// export { protect, admin };
