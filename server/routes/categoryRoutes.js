const express = require('express');
const {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
  getCategoryByName
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

router.get('/name/:name', getCategoryByName);

module.exports = router;
