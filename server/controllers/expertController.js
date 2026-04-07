const expertService = require('../services/expertService');

// @desc    Add new expert
// @route   POST /api/experts
// @access  Private/Admin
exports.addExpert = async (req, res) => {
  try {
    const { name, role, description, specialty, experience, rating, availability, sort_order } = req.body;
    let isActive = req.body.isActive;
    
    if (isActive === 'true') isActive = true;
    if (isActive === 'false') isActive = false;

    if (!role) {
      return res.status(400).json({ success: false, message: 'Expert role is required' });
    }

    const dataObj = { name, role, description, specialty, experience, rating, availability, sort_order };
    if (isActive !== undefined) dataObj.isActive = isActive;

    if (req.file) {
      dataObj.image = `/uploads/${req.file.filename}`;
    }

    const expert = await expertService.addExpert(dataObj);
    res.status(201).json({ success: true, data: expert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all experts
// @route   GET /api/experts
// @access  Public
exports.getExperts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === 'true';
    }

    const experts = await expertService.getExperts(filter);
    res.status(200).json({ success: true, count: experts.length, data: experts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single expert by ID
// @route   GET /api/experts/:id
// @access  Public
exports.getExpertById = async (req, res) => {
  try {
    const expert = await expertService.getExpertById(req.params.id);
    res.status(200).json({ success: true, data: expert });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc    Edit expert
// @route   PATCH /api/experts/:id
// @access  Private/Admin
exports.editExpert = async (req, res) => {
  try {
    const { name, role, description, specialty, experience, rating, availability, sort_order } = req.body;
    let isActive = req.body.isActive;
    
    if (isActive === 'true') isActive = true;
    if (isActive === 'false') isActive = false;

    const dataObj = {};
    if (name) dataObj.name = name;
    if (role) dataObj.role = role;
    if (description !== undefined) dataObj.description = description;
    if (specialty !== undefined) dataObj.specialty = specialty;
    if (experience !== undefined) dataObj.experience = experience;
    if (rating !== undefined) dataObj.rating = rating;
    if (availability !== undefined) dataObj.availability = availability;
    if (sort_order !== undefined) dataObj.sort_order = sort_order;
    if (isActive !== undefined) dataObj.isActive = isActive;

    if (req.file) {
      dataObj.image = `/uploads/${req.file.filename}`;
    }

    const expert = await expertService.editExpert(req.params.id, dataObj);
    res.status(200).json({ success: true, data: expert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Soft delete expert
// @route   DELETE /api/experts/:id
// @access  Private/Admin
exports.deleteExpert = async (req, res) => {
  try {
    await expertService.deleteExpert(req.params.id);
    res.status(200).json({ success: true, message: 'Expert softly deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
