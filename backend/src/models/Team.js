const mongoose = require('mongoose');

const bilingualSchema = {
    en: { type: String, required: true },
    ar: { type: String, required: true }
};

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: bilingualSchema,
    image: { type: String, required: true },
    bio: bilingualSchema,
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
