const express = require('express');
const {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('photo'), addCategory)
  .get(getCategories);

router.route('/:id')
  .patch(protect, upload.single('photo'), editCategory)
  .delete(protect, deleteCategory);

module.exports = router;
