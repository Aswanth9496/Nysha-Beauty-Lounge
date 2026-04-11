const Gallery = require('../models/Gallery');

/**
 * Add images to gallery
 * @param {Object} dataObj - Object containing title and images array
 */
exports.addGallery = async (dataObj) => {
  return await Gallery.create(dataObj);
};
/**
 * Get all gallery items
 * @param {Object} filter - Filter object (e.g., { isActive: true })
 */
exports.getGalleries = async (filter = {}) => {
  return await Gallery.find(filter).sort({ createdAt: -1 });
};

/**
 * Get gallery by ID
 */
exports.getGalleryById = async (id) => {
  return await Gallery.findById(id);
};

/**
 * Delete a gallery entry
 */
exports.deleteGallery = async (id) => {
  return await Gallery.findByIdAndDelete(id);
};

/**
 * Toggle gallery status (isActive)
 */
exports.toggleStatus = async (id) => {
  const gallery = await Gallery.findById(id);
  if (!gallery) return null;
  
  gallery.isActive = !gallery.isActive;
  return await gallery.save();
};
