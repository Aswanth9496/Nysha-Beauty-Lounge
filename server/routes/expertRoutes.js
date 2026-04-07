const express = require('express');
const {
  addExpert,
  getExperts,
  getExpertById,
  editExpert,
  deleteExpert
} = require('../controllers/expertController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('image'), addExpert)
  .get(getExperts);

router.route('/:id')
  .get(getExpertById)
  .patch(protect, upload.single('image'), editExpert)
  .delete(protect, deleteExpert);

module.exports = router;
