const authService = require('../services/authService');
const { sendTokenResponse } = require('../utils/jwtUtils');

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

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
    
    // Validation is now properly handled centrally inside the service.
    const admin = await authService.loginUser(email, password);
    sendTokenResponse(admin, 200, res);
  } catch (error) {
    console.error('Login Error:', error.message);
    const statusCode = error.statusCode || 500;
    const message = statusCode === 500 ? 'Internal Server Error' : error.message;
    res.status(statusCode).json({ success: false, message });
  }
};

// @desc    Log admin out / clear cookie
// @route   POST /api/auth/logout
// @access  Public
exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

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
