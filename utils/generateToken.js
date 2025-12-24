import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  // Create JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  // Set JWT as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,                           // Prevent JS access (XSS safe)
    secure: process.env.NODE_ENV === 'production', // Required for HTTPS (Vercel/Render)
    sameSite: 'None',                         // 🔥 REQUIRED for cross-domain cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,          // 30 days
  })
}

export default generateToken




// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   // Set JWT as an HTTP-Only cookie
//   res.cookie('jwt', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
//     sameSite: 'strict', // Prevent CSRF attacks
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;
