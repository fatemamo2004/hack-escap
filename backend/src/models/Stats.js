const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    participants: { type: Number, default: 0 },
    teams: { type: Number, default: 0 },
    universities: { type: Number, default: 0 },
    attendees: { type: Number, default: 0 },
    volunteers: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Stats', statsSchema);
