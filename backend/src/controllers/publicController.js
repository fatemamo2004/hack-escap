const db = require('../lib/db');

// Generic helper to get all from JSON DB
const getAll = (collection) => async (req, res) => {
    try {
        const data = db.find(collection);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEvent = async (req, res) => {
    try {
        const events = db.find('events');
        res.json(events[0] || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getStats = async (req, res) => {
    try {
        const stats = db.find('stats');
        res.json(stats[0] || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSponsors = getAll('sponsors');
exports.getTeam = getAll('members');
exports.getGallery = getAll('gallery');
exports.getMedia = getAll('media');

exports.createInquiry = async (req, res) => {
    try {
        const inquiry = db.create('inquiries', req.body);
        res.status(201).json({ message: 'Success', id: inquiry._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTimeline = async (req, res) => {
    try {
        const timeline = db.find('timeline');
        const sorted = [...timeline].sort((a,b) => a.order - b.order);
        res.json(sorted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
