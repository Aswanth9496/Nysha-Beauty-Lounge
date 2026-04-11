const galleryService = require('../services/galleryService');
const { deleteFile } = require('../utils/fileUtils');

// @desc    Add new images to gallery
// @route   POST /api/gallery
// @access  Private/Admin
exports.addGallery = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please upload at least one image' });
    }

    if (req.files.length > 10) {
      return res.status(400).json({ success: false, message: 'You can upload a maximum of 10 images' });
    }

    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    const gallery = await galleryService.addGallery({
      images
    });

    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get active images for gallery (Public)
// @route   GET /api/gallery
// @access  Public
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getGalleries({ isActive: true });
    res.status(200).json({ success: true, count: galleries.length, data: galleries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all gallery entries (Admin Preview)
// @route   GET /api/gallery/admin
// @access  Private/Admin
exports.getAdminGalleries = async (req, res) => {
  try {
    const galleries = await galleryService.getGalleries({});
    res.status(200).json({ success: true, count: galleries.length, data: galleries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery entry
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await galleryService.getGalleryById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery entry not found' });
    }

    // Delete actual files from disk
    if (gallery.images && gallery.images.length > 0) {
      gallery.images.forEach(imagePath => {
        deleteFile(imagePath);
      });
    }

    await galleryService.deleteGallery(req.params.id);
    res.status(200).json({ success: true, message: 'Gallery entry and associated files deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Toggle gallery status (Active/Block)
// @route   PATCH /api/gallery/:id/status
// @access  Private/Admin
exports.toggleGalleryStatus = async (req, res) => {
  try {
    const gallery = await galleryService.toggleStatus(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery entry not found' });
    }

    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
