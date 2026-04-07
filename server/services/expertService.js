const Expert = require('../models/Expert');
const fs = require('fs');
const path = require('path');

const addExpert = async (data) => {
  const expert = new Expert(data);
  await expert.save();
  return expert;
};

const getExperts = async (filter = {}) => {
  return await Expert.find({ isDeleted: false, ...filter }).sort({ sort_order: 1, createdAt: -1 });
};

const getExpertById = async (id) => {
  const expert = await Expert.findById(id).where({ isDeleted: false });
  if (!expert) {
    throw new Error('Expert not found');
  }
  return expert;
};

const editExpert = async (id, data) => {
  const expert = await Expert.findById(id);
  if (!expert || expert.isDeleted) {
    throw new Error('Expert not found');
  }

  // Delete old image if a new one is uploaded
  if (data.image && expert.image && data.image !== expert.image) {
    const oldImagePath = path.join(__dirname, '..', expert.image);
    if (fs.existsSync(oldImagePath)) {
      try {
        fs.unlinkSync(oldImagePath);
      } catch (err) {
        console.error('Failed to delete old image:', err);
      }
    }
  }

  const updatedExpert = await Expert.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  return updatedExpert;
};

const deleteExpert = async (id) => {
  const expert = await Expert.findById(id);
  if (!expert || expert.isDeleted) {
    throw new Error('Expert not found');
  }

  expert.isDeleted = true;
  await expert.save();
};

module.exports = {
  addExpert,
  getExperts,
  getExpertById,
  editExpert,
  deleteExpert
};
