const express = require('express');
const {
  addSubCategory,
  getSubCategories,
  getSubCategoryById,
  editSubCategory,
  deleteSubCategory
} = require('../controllers/subCategoryController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

// Multer configured to handle multiple fields
const uploadFields = upload.fields([
  { name: 'cover_image', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

router.route('/')
  .post(protect, uploadFields, addSubCategory)
  .get(getSubCategories); // Publicly accessible GET

router.route('/:id')
  .get(getSubCategoryById) // Publicly accessible GET
  .patch(protect, uploadFields, editSubCategory)
  .delete(protect, deleteSubCategory);

module.exports = router;
