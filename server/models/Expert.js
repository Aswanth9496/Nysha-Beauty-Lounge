const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  specialty: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Off'],
    default: 'Available'
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sort_order: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false // Hides isDeleted from query results by default
  }
}, { timestamps: true });

const Expert = mongoose.model('Expert', expertSchema);
module.exports = Expert;
