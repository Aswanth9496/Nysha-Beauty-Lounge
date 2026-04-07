const serviceCore = require('../services/serviceService'); 

// Helper to safely parse JSON strings from form-data (for things like variants and specs array)
const parseJSONField = (field) => {
  if (!field) return undefined;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch(e) {
      return field; // Return as a string if standard string
    }
  }
  return field;
};

// @desc    Add new service
// @route   POST /api/services
// @access  Private
exports.addService = async (req, res) => {
  try {
    const { subCategoryId, title, subtitle, description, description_2, duration, target_skin, hair_length, whatsapp_message, sort_order } = req.body;
    
    // Parse booleans that might arrive as strings from formData
    let is_visible = req.body.is_visible !== undefined ? (req.body.is_visible === 'true' || req.body.is_visible === true) : true;
    let has_variants = req.body.has_variants !== undefined ? (req.body.has_variants === 'true' || req.body.has_variants === true) : false;

    // Parse Numbers
    let amount = req.body.amount ? parseFloat(req.body.amount) : undefined;

    // Parse Arrays and Objects (sent as JSON strings in formData)
    let whats_included = parseJSONField(req.body.whats_included);
    let variants = parseJSONField(req.body.variants);

    if (!subCategoryId || !title) {
      return res.status(400).json({ success: false, message: 'Sub-Category ID and Service title are required' });
    }

    const dataObj = { 
      subCategoryId, title, subtitle, description, description_2, duration, target_skin,
      hair_length, whatsapp_message, sort_order, is_visible, has_variants, amount,
      whats_included, variants
    };

    if (req.file) {
      dataObj.image_url = `/uploads/${req.file.filename}`;
    }

    const service = await serviceCore.addService(dataObj);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.subCategoryId) filter.subCategoryId = req.query.subCategoryId;
    if (req.query.is_visible !== undefined) filter.is_visible = req.query.is_visible === 'true';

    const services = await serviceCore.getServices(filter);
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await serviceCore.getServiceById(req.params.id);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc    Edit service
// @route   PATCH /api/services/:id
// @access  Private
exports.editService = async (req, res) => {
  try {
    const dataObj = { ...req.body };
    
    // Safety convert string booleans
    if (req.body.is_visible !== undefined) dataObj.is_visible = (req.body.is_visible === 'true' || req.body.is_visible === true);
    if (req.body.has_variants !== undefined) dataObj.has_variants = (req.body.has_variants === 'true' || req.body.has_variants === true);
    
    // Safety float
    if (req.body.amount !== undefined) dataObj.amount = parseFloat(req.body.amount);
    
    // Parse JSON
    if (req.body.whats_included !== undefined) dataObj.whats_included = parseJSONField(req.body.whats_included);
    if (req.body.variants !== undefined) dataObj.variants = parseJSONField(req.body.variants);

    if (req.file) {
      dataObj.image_url = `/uploads/${req.file.filename}`;
    }

    const service = await serviceCore.editService(req.params.id, dataObj);
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Soft delete service
// @route   DELETE /api/services/:id
// @access  Private
exports.deleteService = async (req, res) => {
  try {
    await serviceCore.deleteService(req.params.id);
    res.status(200).json({ success: true, message: 'Service softly deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
