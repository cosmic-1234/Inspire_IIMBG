const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const { Startup, Application, User } = require('../models');

// Founder Dashboard Data
router.get('/founder', verifyToken, authorizeRole('founder'), async (req, res) => {
    try {
        const startup = await Startup.findOne({
            where: { founder_id: req.user.id },
            include: [{ model: Application }]
        });

        if (!startup) {
            return res.json({
                startup: null,
                applications: []
            });
        }

        res.json({
            startup,
            applications: startup.Applications || []
        });

    } catch (error) {
        console.error('Founder dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Founder: Update Startup Details
router.put('/founder/startup', verifyToken, authorizeRole('founder'), async (req, res) => {
    try {
        const { name, description, industry, stage, website_url, logo_url } = req.body;

        const startup = await Startup.findOne({
            where: { founder_id: req.user.id }
        });

        if (!startup) {
            return res.status(404).json({ error: 'Startup not found' });
        }

        // Update fields
        if (name) startup.name = name;
        if (description) startup.description = description;
        if (industry) startup.industry = industry;
        if (stage) startup.stage = stage;
        if (website_url) startup.website_url = website_url;
        if (logo_url) startup.logo_url = logo_url;

        await startup.save();

        res.json({ message: 'Startup profile updated', startup });

    } catch (error) {
        console.error('Update startup error:', error);
        res.status(500).json({ error: 'Failed to update startup profile' });
    }
});

// Admin Dashboard Data
router.get('/admin', verifyToken, authorizeRole('admin'), async (req, res) => {
    try {
        console.log('Fetching admin dashboard data...');
        const applications = await Application.findAll({
            include: [
                {
                    model: Startup,
                    include: [{ model: User, attributes: ['name', 'email'] }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        console.log(`Found ${applications.length} applications for admin dashboard.`);

        // Calculate stats
        const stats = {
            total: applications.length,
            pending: applications.filter(app => app.status === 'submitted').length,
            approved: applications.filter(app => app.status === 'accepted').length,
            rejected: applications.filter(app => app.status === 'rejected').length
        };

        res.json({
            stats,
            applications
        });

    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch admin data' });
    }
});

// Admin: Update Application Status
router.put('/admin/applications/:id', verifyToken, authorizeRole('admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByPk(req.params.id);

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        application.status = status;
        await application.save();

        res.json({ message: 'Application status updated', application });

    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

module.exports = router;
