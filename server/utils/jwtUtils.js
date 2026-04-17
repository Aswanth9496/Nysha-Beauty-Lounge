const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m',
  });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
  });
};

// Send token response in cookies
const sendTokenResponse = (admin, statusCode, res) => {
  const accessToken = generateAccessToken(admin._id);
  const refreshToken = generateRefreshToken(admin._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite : process.env.NODE_ENV === 'production' ? "none" : "lax", // Lax is more reliable for production redirects while remaining secure
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? ".nyshabeautylounge.com" : undefined,
  };

  // Set Access Token Cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes in ms
  });

  // Set Refresh Token Cookie (longer-lived)
  const refreshExpireDays = parseInt(process.env.JWT_REFRESH_COOKIE_EXPIRE) || 7;
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: refreshExpireDays * 24 * 60 * 60 * 1000, // Convert days to ms
  });

  if (admin.password) {
    admin.password = undefined;
  }

  res.status(statusCode).json({
    success: true,
    admin,
    // We don't send tokens in the JSON body because we use HttpOnly cookies for security
  });
};

module.exports = { generateAccessToken, generateRefreshToken, sendTokenResponse };
