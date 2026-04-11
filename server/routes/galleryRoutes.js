const express = require('express');
const { addGallery, getGalleries, getAdminGalleries, deleteGallery, toggleGalleryStatus } = require('../controllers/galleryController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

// Public routes
router.get('/', getGalleries);

// Protected routes
router.post('/', protect, upload.array('images', 10), addGallery);
router.get('/admin', protect, getAdminGalleries);
router.delete('/:id', protect, deleteGallery);
router.patch('/:id/status', protect, toggleGalleryStatus);

module.exports = router;
