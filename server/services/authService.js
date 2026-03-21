const Admin = require('../models/Admin');

const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Check if admin exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    throw new Error('Admin already exists');
  }

  // Create admin
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password
  });

  return admin;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    const err = new Error('Please provide an email and password');
    err.statusCode = 400;
    throw err;
  }

  // Check for admin
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    const err = new Error('Admin not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if password matches
  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    const err = new Error('Invalid password');
    err.statusCode = 401;
    throw err;
  }

  return admin;
};

const getAdminById = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  return admin;
};

const updateDetails = async (id, fieldsToUpdate) => {
  const admin = await Admin.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  return admin;
};

const updatePassword = async (id, currentPassword, newPassword) => {
  const admin = await Admin.findById(id).select('+password');

  if (!admin) {
    throw new Error('Admin not found');
  }

  // Check current password
  const isMatch = await admin.matchPassword(currentPassword);
  if (!isMatch) {
    throw new Error('Incorrect current password');
  }

  admin.password = newPassword;
  await admin.save();
};

module.exports = { registerUser, loginUser, getAdminById, updateDetails, updatePassword };
