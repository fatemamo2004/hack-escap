const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['contact', 'sponsor', 'team'], 
    required: true 
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String },
  details: {
    companyName: String,
    tierInterest: String,
    teamName: String,
    university: String,
    members: [String]
  },
  status: { 
    type: String, 
    enum: ['new', 'read', 'archived'], 
    default: 'new' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
