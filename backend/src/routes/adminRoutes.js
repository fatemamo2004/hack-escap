const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are protected
router.use(protect);
router.use(authorize('admin', 'organizer'));

// Event
router.post('/event', adminController.createEvent);
router.put('/event/:id', adminController.updateEvent);
router.delete('/event/:id', adminController.deleteEvent);

// Sponsor
router.post('/sponsors', adminController.createSponsor);
router.put('/sponsors/:id', adminController.updateSponsor);
router.delete('/sponsors/:id', adminController.deleteSponsor);

// Team
router.post('/team', adminController.createTeam);
router.put('/team/:id', adminController.updateTeam);
router.delete('/team/:id', adminController.deleteTeam);

// Timeline
router.post('/timeline', adminController.createTimeline);
router.put('/timeline/:id', adminController.updateTimeline);
router.delete('/timeline/:id', adminController.deleteTimeline);

// Gallery
router.post('/gallery', adminController.createGallery);
router.put('/gallery/:id', adminController.updateGallery);
router.delete('/gallery/:id', adminController.deleteGallery);

// Media
router.post('/media', adminController.createMedia);
router.put('/media/:id', adminController.updateMedia);
router.delete('/media/:id', adminController.deleteMedia);

// Inquiries
router.get('/inquiries', adminController.getInquiries);

// Stats
router.put('/stats', adminController.updateStats);

module.exports = router;
