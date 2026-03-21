const Category = require('../models/Category');

exports.addCategory = async (data) => {
  const existingCategory = await Category.findOne({ name: data.name });
  if (existingCategory) {
    throw new Error('A category with this name already exists');
  }
  return await Category.create(data);
};

exports.getCategories = async () => {
  // Only get undeleted ones
  return await Category.find({ isDeleted: false });
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
  if (!category || category.isDeleted) {
    throw new Error('Category not found');
  }
  return category;
};

exports.deleteCategory = async (id) => {
  // Soft delete
  const category = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};
