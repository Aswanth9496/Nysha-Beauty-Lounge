const express = require('express');
const {
  addHeader,
  getHeaders,
  getHeaderById,
  editHeader,
  deleteHeader
} = require('../controllers/headerController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'banner_images', maxCount: 2 },
  { name: 'shop_image_1', maxCount: 1 },
  { name: 'shop_image_2', maxCount: 1 }
]);

router.route('/')
  .post(protect, uploadFields, addHeader)
  .get(getHeaders); // Public

router.route('/:id')
  .get(getHeaderById) // Public
  .patch(protect, uploadFields, editHeader)
  .delete(protect, deleteHeader);

module.exports = router;
