const categoryService = require('../services/categoryService');

// @desc    Add new category
// @route   POST /api/categories
// @access  Private/Admin
exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let isActive = req.body.isActive;
    
    // Parse boolean from multipart/form-data string if necessary
    if (isActive === 'true') isActive = true;
    if (isActive === 'false') isActive = false;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide a category name' });
    }

    let photo = '';
    if (req.file) {
      photo = `/uploads/${req.file.filename}`;
    }

    // Build the data object
    const dataObj = { name, description, photo };
    if (isActive !== undefined) dataObj.isActive = isActive;

    const category = await categoryService.addCategory(dataObj);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all categories (not soft deleted)
// @route   GET /api/categories
// @access  Private/Admin
exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Edit category
// @route   PATCH /api/categories/:id
// @access  Private/Admin
exports.editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let isActive = req.body.isActive;
    
    // Parse boolean from multipart/form-data string if necessary
    if (isActive === 'true') isActive = true;
    if (isActive === 'false') isActive = false;

    const dataObj = {};
    if (name) dataObj.name = name;
    if (description !== undefined) dataObj.description = description;
    if (isActive !== undefined) dataObj.isActive = isActive;
    if (req.file) {
      dataObj.photo = `/uploads/${req.file.filename}`;
    }

    const category = await categoryService.editCategory(req.params.id, dataObj);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Soft delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: 'Category softly deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
