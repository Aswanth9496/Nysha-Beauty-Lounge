const express = require('express');
const {
  addService,
  getServices,
  getServiceById,
  editService,
  deleteService
} = require('../controllers/serviceController');

const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('image_url'), addService)
  .get(getServices); // Public

router.route('/:id')
  .get(getServiceById) // Public
  .patch(protect, upload.single('image_url'), editService)
  .delete(protect, deleteService);

module.exports = router;
