const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category reference is required']
  },
  name: {
    type: String,
    required: [true, 'Sub-Category name is required'],
    trim: true,
  },
  cover_image: {
    type: String
  },
  description: {
    type: String,
    trim: true,
  },
  images: [{
    type: String // Array of image URLs/paths for the gallery
  }],
  is_visible: {
    type: Boolean,
    default: true,
  },
  sort_order: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false // Hides isDeleted from query results by default
  }
}, { timestamps: true });

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
