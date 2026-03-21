const headerService = require('../services/headerService');

// @desc    Add new header config
// @route   POST /api/header
// @access  Private/Admin
exports.addHeader = async (req, res) => {
  try {
    const { sub_title, phone_number, secondary_phone_number, email, address, latitude, longitude, banner_text } = req.body;
    let isActive = req.body.isActive !== undefined ? (req.body.isActive === 'true' || req.body.isActive === true) : true;

    const dataObj = { sub_title, phone_number, secondary_phone_number, email, address, latitude, longitude, banner_text, isActive };

    // Handle files via Multer (logo and 2 banner images)
    if (req.files) {
      if (req.files['logo'] && req.files['logo'].length > 0) {
        dataObj.logo = `/uploads/${req.files['logo'][0].filename}`;
      }
      if (req.files['banner_images'] && req.files['banner_images'].length > 0) {
        dataObj.banner_images = req.files['banner_images'].map(file => `/uploads/${file.filename}`);
      }
      if (req.files['shop_image_1'] && req.files['shop_image_1'].length > 0) {
        dataObj.shop_image_1 = `/uploads/${req.files['shop_image_1'][0].filename}`;
      }
      if (req.files['shop_image_2'] && req.files['shop_image_2'].length > 0) {
        dataObj.shop_image_2 = `/uploads/${req.files['shop_image_2'][0].filename}`;
      }
    }

    const header = await headerService.addHeader(dataObj);
    res.status(201).json({ success: true, data: header });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all header configs
// @route   GET /api/header
// @access  Public
exports.getHeaders = async (req, res) => {
  try {
    const headers = await headerService.getHeaders();
    res.status(200).json({ success: true, count: headers.length, data: headers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single header config by ID
// @route   GET /api/header/:id
// @access  Public
exports.getHeaderById = async (req, res) => {
  try {
    const header = await headerService.getHeaderById(req.params.id);
    res.status(200).json({ success: true, data: header });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc    Edit header config
// @route   PATCH /api/header/:id
// @access  Private/Admin
exports.editHeader = async (req, res) => {
  try {
    const dataObj = { ...req.body };
    
    // Safety convert string booleans
    if (req.body.isActive !== undefined) {
      dataObj.isActive = (req.body.isActive === 'true' || req.body.isActive === true);
    }

    // Merging logic for banner_images to allow individual management
    let currentBanners = [];
    if (req.body.banner_images) {
      currentBanners = Array.isArray(req.body.banner_images) 
        ? req.body.banner_images 
        : [req.body.banner_images];
    }

    if (req.files) {
      if (req.files['logo'] && req.files['logo'].length > 0) {
        dataObj.logo = `/uploads/${req.files['logo'][0].filename}`;
      }
      
      if (req.files['banner_images'] && req.files['banner_images'].length > 0) {
        const newBanners = req.files['banner_images'].map(file => `/uploads/${file.filename}`);
        dataObj.banner_images = [...currentBanners, ...newBanners].slice(0, 2);
      } else if (req.body.banner_images !== undefined) {
        // If no new files but existing ones were specified, update with those
        dataObj.banner_images = currentBanners;
      }

      if (req.files['shop_image_1'] && req.files['shop_image_1'].length > 0) {
        dataObj.shop_image_1 = `/uploads/${req.files['shop_image_1'][0].filename}`;
      }
      if (req.files['shop_image_2'] && req.files['shop_image_2'].length > 0) {
        dataObj.shop_image_2 = `/uploads/${req.files['shop_image_2'][0].filename}`;
      }
    } else if (req.body.banner_images !== undefined) {
      dataObj.banner_images = currentBanners;
    }

    const header = await headerService.editHeader(req.params.id, dataObj);
    res.status(200).json({ success: true, data: header });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete header config
// @route   DELETE /api/header/:id
// @access  Private/Admin
exports.deleteHeader = async (req, res) => {
  try {
    await headerService.deleteHeader(req.params.id);
    res.status(200).json({ success: true, message: 'Header configuration deleted' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
