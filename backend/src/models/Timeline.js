const mongoose = require('mongoose');

const bilingualSchema = {
    en: { type: String, required: true },
    ar: { type: String, required: true }
};

const timelineSchema = new mongoose.Schema({
    milestone: bilingualSchema,
    description: bilingualSchema,
    date: { type: String, required: true }, // Using string for flexibility like "Oct 2025"
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
