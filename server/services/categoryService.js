const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const subCategoryService = require('./subCategoryService');
const fs = require('fs');
const path = require('path');

exports.addCategory = async (data) => {
  const existingCategory = await Category.findOne({ name: data.name });
  if (existingCategory) {
    throw new Error('A category with this name already exists');
  }
  return await Category.create(data);
};

exports.getCategories = async () => {
  return await Category.find();
};

exports.editCategory = async (id, data) => {
  if (data.name) {
    const existingCategory = await Category.findOne({ name: data.name });
    if (existingCategory && existingCategory._id.toString() !== id) {
      throw new Error('A category with this name already exists');
    }
  }

  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  // 1. Cascade delete sub-categories
  const subCategories = await SubCategory.find({ categoryId: id });
  for (const subCat of subCategories) {
    await subCategoryService.deleteSubCategory(subCat._id);
  }

  // 2. Delete category photo from disk
  if (category.photo) {
    const photoPath = path.join(__dirname, '..', category.photo);
    if (fs.existsSync(photoPath)) {
      try {
        fs.unlinkSync(photoPath);
      } catch (err) {
        console.error('Failed to delete category photo:', err);
      }
    }
  }

  // 3. Delete the category record
  await Category.findByIdAndDelete(id);
  return category;
};

exports.getCategoryByName = async (name) => {
  // Case-insensitive search by name
  return await Category.findOne({ 
    name: { $regex: new RegExp(`^${name.replace(/-/g, ' ')}$`, 'i') }
  });
};
