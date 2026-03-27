const mongoose = require('mongoose');

const bilingualSchema = {
    en: { type: String, required: true },
    ar: { type: String, required: true }
};

const sponsorSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Usually company names don't need translation but description does
    logo: { type: String, required: true },
    website: { type: String },
    tier: {
        type: String,
        enum: ['gold', 'silver', 'bronze', 'partner'],
        required: true
    },
    description: bilingualSchema
}, { timestamps: true });

module.exports = mongoose.model('Sponsor', sponsorSchema);
