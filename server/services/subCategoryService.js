const SubCategory = require('../models/SubCategory');
const Service = require('../models/Service');
const serviceService = require('./serviceService');
const fs = require('fs');
const path = require('path');

exports.addSubCategory = async (data) => {
  const existing = await SubCategory.findOne({ name: data.name, categoryId: data.categoryId });
  if (existing) {
    throw new Error('A sub-category with this name already exists in this category');
  }
  return await SubCategory.create(data);
};

exports.getSubCategories = async (filter = {}) => {
  return await SubCategory.find(filter).populate('categoryId', 'name isActive');
};

exports.getSubCategoryById = async (id) => {
  const subCategory = await SubCategory.findById(id).populate('categoryId', 'name isActive');
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
  
  if (!subCategory) {
    throw new Error('Sub-Category not found');
  }
  return subCategory;
};

exports.deleteSubCategory = async (id) => {
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    throw new Error('Sub-Category not found');
  }

  // 1. Cascade delete services
  const services = await Service.find({ subCategoryId: id });
  for (const service of services) {
    await serviceService.deleteService(service._id);
  }

  // 2. Delete sub-category images from disk
  // Cover image
  if (subCategory.cover_image) {
    const coverPath = path.join(__dirname, '..', subCategory.cover_image);
    if (fs.existsSync(coverPath)) {
      try {
        fs.unlinkSync(coverPath);
      } catch (err) {
        console.error('Failed to delete sub-category cover image:', err);
      }
    }
  }
  // Gallery images
  if (subCategory.images && subCategory.images.length > 0) {
    subCategory.images.forEach(img => {
      const imgPath = path.join(__dirname, '..', img);
      if (fs.existsSync(imgPath)) {
        try {
          fs.unlinkSync(imgPath);
        } catch (err) {
          console.error('Failed to delete sub-category gallery image:', err);
        }
      }
    });
  }

  // 3. Delete the sub-category record
  await SubCategory.findByIdAndDelete(id);
  return subCategory;
};
