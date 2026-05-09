const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  photo: {
    type: String
  },
  metadata: {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    keywords: { type: String, trim: true }
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sort_order: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false // Hides isDeleted from query results by default
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
