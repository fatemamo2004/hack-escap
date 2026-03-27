const db = require('../lib/db');

// Generic CRUD handlers for JSON DB
const createOne = (collection) => async (req, res) => {
    try {
        const doc = db.create(collection, req.body);
        res.status(201).json(doc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateOne = (collection) => async (req, res) => {
    try {
        const doc = db.update(collection, { _id: req.params.id }, req.body);
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.json(doc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOne = (collection) => async (req, res) => {
    try {
        db.delete(collection, { _id: req.params.id });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Event
exports.createEvent = createOne('events');
exports.updateEvent = updateOne('events');
exports.deleteEvent = deleteOne('events');

// Sponsor
exports.createSponsor = createOne('sponsors');
exports.updateSponsor = updateOne('sponsors');
exports.deleteSponsor = deleteOne('sponsors');

// Team (Internal name 'Member')
exports.createTeam = createOne('members');
exports.updateTeam = updateOne('members');
exports.deleteTeam = deleteOne('members');

// Timeline
exports.createTimeline = createOne('timeline');
exports.updateTimeline = updateOne('timeline');
exports.deleteTimeline = deleteOne('timeline');

// Gallery
exports.createGallery = createOne('gallery');
exports.updateGallery = updateOne('gallery');
exports.deleteGallery = deleteOne('gallery');

// Media
exports.createMedia = createOne('media');
exports.updateMedia = updateOne('media');
exports.deleteMedia = deleteOne('media');

exports.getInquiries = async (req, res) => {
    try {
        const inquiries = db.find('inquiries');
        res.json([...inquiries].reverse());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStats = async (req, res) => {
    try {
        const stats = db.find('stats');
        const id = stats[0]?._id || '1';
        const doc = db.update('stats', { _id: id }, req.body);
        res.json(doc);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
