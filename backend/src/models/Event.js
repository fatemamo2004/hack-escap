const mongoose = require('mongoose');

const bilingualSchema = {
    en: { type: String, required: true },
    ar: { type: String, required: true }
};

const eventSchema = new mongoose.Schema({
    name: bilingualSchema,
    description: bilingualSchema,
    date: { type: Date, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming'
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
