const authService = require('../services/authService');
const { sendTokenResponse, generateAccessToken } = require('../utils/jwtUtils');
const jwt = require('jsonwebtoken');

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public (Protected by secret)
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, registrationSecret } = req.body;

    // Security: Check for registration secret to prevent public admin creation
    if (registrationSecret !== process.env.REGISTRATION_SECRET) {
      return res.status(401).json({ success: false, message: 'Invalid registration secret' });
    }

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const admin = await authService.registerUser({ firstName, lastName, email, password });
    
    if (admin.password) {
      admin.password = undefined;
    }

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully. Please log in.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await authService.loginUser(email, password);
    sendTokenResponse(admin, 200, res);
  } catch (error) {
    console.error('Login Error:', error.message);
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : error.message;
    res.status(statusCode).json({ success: false, message });
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    // Generate new access token
    const accessToken = generateAccessToken(decoded.id);

    // Set new access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 60 * 1000, 
    });

    res.status(200).json({ success: true, message: 'Token refreshed' });
  } catch (err) {
    console.error('Refresh Token Error:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

// @desc    Log admin out / clear cookies
// @route   POST /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0),
  };

  res.cookie('accessToken', '', cookieOptions);
  res.cookie('refreshToken', '', cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Admin logged out successfully'
  });
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const admin = await authService.getAdminById(req.admin.id);
    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update admin details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    const admin = await authService.updateDetails(req.admin.id, fieldsToUpdate);

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res) => {
  try {
    await authService.updatePassword(req.admin.id, req.body.currentPassword, req.body.newPassword);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
