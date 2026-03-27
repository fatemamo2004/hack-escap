const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  imageUrl: { type: String, required: true },
  category: { type: String, enum: ['event', 'prep', 'workshop', 'award'], default: 'event' },
  year: { type: String, default: '2025' },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
