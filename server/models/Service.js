const mongoose = require('mongoose');

// Define variants separately to be nested in the service schema
const variantSchema = new mongoose.Schema({
  label: { type: String, required: true },
  experience: { type: String }, // e.g. 'Senior', 'Junior'
  amount: { type: Number, required: true },
  description_1: { type: String },
  description_2: { type: String },
  duration: { type: String }, 
  is_visible: { type: Boolean, default: true },
  sort_order: { type: Number, default: 0 }
});

const serviceSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: [true, 'Sub-Category reference is required']
  },
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  description_2: {
    type: String,
  },
  duration: {
    type: String, // E.g., '1 hour', '45 mins'
  },
  target_skin: {
    type: String,
  },
  whats_included: [{ // Allow multiple inclusions
    type: String
  }],
  hair_length: {
    type: String, // E.g., 'Short', 'Medium', 'Long'
  },
  image_url: {
    type: String,
  },
  whatsapp_message: {
    type: String,
  },
  is_visible: {
    type: Boolean,
    default: true,
  },
  sort_order: {
    type: Number,
    default: 0
  },
  has_variants: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number, // Applicable only if has_variants is false
  },
  variants: [variantSchema], // Applied only if has_variants is true
  isDeleted: {
    type: Boolean,
    default: false,
    select: false 
  }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
