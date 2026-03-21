const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  sub_title: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  secondary_phone_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  address: {
    type: String,
    trim: true,
  },
  latitude: {
    type: String,
    trim: true,
  },
  longitude: {
    type: String,
    trim: true,
  },
  banner_images: [{ // Array to hold up to 2 banner images
    type: String
  }],
  banner_text: {
    type: String,
    trim: true,
  },
  shop_image_1: {
    type: String,
  },
  shop_image_2: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Header', headerSchema);
