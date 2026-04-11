const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// Send token response in cookie
const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  if (admin.password) {
    admin.password = undefined;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      admin
    });
};

module.exports = { generateToken, sendTokenResponse };
