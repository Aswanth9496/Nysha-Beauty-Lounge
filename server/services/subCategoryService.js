const SubCategory = require('../models/SubCategory');

exports.addSubCategory = async (data) => {
  const existing = await SubCategory.findOne({ name: data.name, categoryId: data.categoryId });
  if (existing) {
    throw new Error('A sub-category with this name already exists in this category');
  }
  return await SubCategory.create(data);
};

exports.getSubCategories = async (filter = {}) => {
  // Always exclude softly deleted ones
  filter.isDeleted = false;
  return await SubCategory.find(filter).populate('categoryId', 'name isActive isDeleted');
};

exports.getSubCategoryById = async (id) => {
  const subCategory = await SubCategory.findOne({ _id: id, isDeleted: false }).populate('categoryId', 'name isActive isDeleted');
  if (!subCategory) {
    throw new Error('Sub-Category not found');
  }
  return subCategory;
};

exports.editSubCategory = async (id, data) => {
  if (data.name && data.categoryId) {
    const existing = await SubCategory.findOne({ name: data.name, categoryId: data.categoryId });
    if (existing && existing._id.toString() !== id) {
      throw new Error('A sub-category with this name already exists in this category');
    }
  }

  const subCategory = await SubCategory.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  
  if (!subCategory || subCategory.isDeleted) {
    throw new Error('Sub-Category not found');
  }
  return subCategory;
};

exports.deleteSubCategory = async (id) => {
  const subCategory = await SubCategory.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!subCategory) {
    throw new Error('Sub-Category not found');
  }
  return subCategory;
};
