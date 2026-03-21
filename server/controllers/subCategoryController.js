const subCategoryService = require('../services/subCategoryService');

// @desc    Add new sub-category
// @route   POST /api/subcategories
// @access  Private
exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId, name, description, sort_order } = req.body;
    let is_visible = req.body.is_visible;
    
    // Parse boolean from multipart/form-data string if necessary
    if (is_visible === 'true') is_visible = true;
    if (is_visible === 'false') is_visible = false;

    if (!categoryId || !name) {
      return res.status(400).json({ success: false, message: 'Category ID and Sub-Category name are required' });
    }

    const dataObj = { categoryId, name, description, sort_order };
    if (is_visible !== undefined) dataObj.is_visible = is_visible;

    // Handle uploaded files (multer .fields())
    if (req.files) {
      if (req.files['cover_image'] && req.files['cover_image'].length > 0) {
        dataObj.cover_image = `/uploads/${req.files['cover_image'][0].filename}`;
      }
      if (req.files['images'] && req.files['images'].length > 0) {
        dataObj.images = req.files['images'].map(file => `/uploads/${file.filename}`);
      }
    }

    const subCategory = await subCategoryService.addSubCategory(dataObj);
    res.status(201).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all sub-categories
// @route   GET /api/subcategories
// @access  Public
exports.getSubCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }
    // Optionally filter by visibility for public users
    if (req.query.is_visible !== undefined) {
      filter.is_visible = req.query.is_visible === 'true';
    }

    const subCategories = await subCategoryService.getSubCategories(filter);
    res.status(200).json({ success: true, count: subCategories.length, data: subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single sub-category by ID
// @route   GET /api/subcategories/:id
// @access  Public
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await subCategoryService.getSubCategoryById(req.params.id);
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc    Edit sub-category
// @route   PATCH /api/subcategories/:id
// @access  Private
exports.editSubCategory = async (req, res) => {
  try {
    const { categoryId, name, description, sort_order } = req.body;
    let is_visible = req.body.is_visible;
    
    // Parse boolean from multipart/form-data string if necessary
    if (is_visible === 'true') is_visible = true;
    if (is_visible === 'false') is_visible = false;

    const dataObj = {};
    if (categoryId) dataObj.categoryId = categoryId;
    if (name) dataObj.name = name;
    if (description !== undefined) dataObj.description = description;
    if (sort_order !== undefined) dataObj.sort_order = sort_order;
    if (is_visible !== undefined) dataObj.is_visible = is_visible;

    // Handle files (Replacing existing ones in standard behavior)
    if (req.files) {
      if (req.files['cover_image'] && req.files['cover_image'].length > 0) {
        dataObj.cover_image = `/uploads/${req.files['cover_image'][0].filename}`;
      }
      if (req.files['images'] && req.files['images'].length > 0) {
        dataObj.images = req.files['images'].map(file => `/uploads/${file.filename}`);
      }
    }

    const subCategory = await subCategoryService.editSubCategory(req.params.id, dataObj);
    res.status(200).json({ success: true, data: subCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Soft delete sub-category
// @route   DELETE /api/subcategories/:id
// @access  Private
exports.deleteSubCategory = async (req, res) => {
  try {
    await subCategoryService.deleteSubCategory(req.params.id);
    res.status(200).json({ success: true, message: 'Sub-Category softly deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
