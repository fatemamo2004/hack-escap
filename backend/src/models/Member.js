const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  image: { type: String, default: '/images/default-avatar.png' },
  bio: {
    en: { type: String },
    ar: { type: String }
  },
  socials: {
    linkedin: String,
    twitter: String,
    github: String
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
