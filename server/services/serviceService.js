const Service = require('../models/Service');

exports.addService = async (data) => {
  const existing = await Service.findOne({ title: data.title, subCategoryId: data.subCategoryId });
  if (existing) {
    throw new Error('A service with this title already exists in this sub-category');
  }
  // Ensure variants follow schema correctly if provided
  return await Service.create(data);
};

exports.getServices = async (filter = {}) => {
  // Always exclude softly deleted ones
  filter.isDeleted = false;
  return await Service.find(filter).populate('subCategoryId', 'name is_visible isDeleted categoryId');
};

exports.getServiceById = async (id) => {
  const service = await Service.findOne({ _id: id, isDeleted: false }).populate('subCategoryId', 'name is_visible isDeleted categoryId');
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

exports.editService = async (id, data) => {
  if (data.title && data.subCategoryId) {
    const existing = await Service.findOne({ title: data.title, subCategoryId: data.subCategoryId });
    if (existing && existing._id.toString() !== id) {
      throw new Error('A service with this title already exists in this sub-category');
    }
  }

  const service = await Service.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
  
  if (!service || service.isDeleted) {
    throw new Error('Service not found');
  }
  return service;
};

exports.deleteService = async (id) => {
  const service = await Service.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};
