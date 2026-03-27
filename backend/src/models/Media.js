const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  sourceName: { type: String, required: true },
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  link: { type: String, required: true },
  logo: { type: String }, // Source logo
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Media', mediaSchema);
