const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { User, Startup, Application, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require('../services/emailService');
const { uploadFile } = require('../services/cloudStorage');

// Configure Multer for memory storage (files held in memory for upload to GCS)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Handle Application Submission
router.post('/', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'pitchDeck', maxCount: 1 }
]), async (req, res) => {
    console.log('Received application submission');

    // Upload files to GCS
    let logoUrl = null;
    let pitchDeckUrl = null;

    try {
        if (req.files && req.files['logo']) {
            logoUrl = await uploadFile(req.files['logo'][0]);
            console.log('Logo uploaded:', logoUrl);
        }

        if (req.files && req.files['pitchDeck']) {
            pitchDeckUrl = await uploadFile(req.files['pitchDeck'][0]);
            console.log('Pitch Deck uploaded:', pitchDeckUrl);
        }
    } catch (uploadError) {
        console.error('File Upload Failed:', uploadError);
        return res.status(500).json({ error: 'File upload failed', details: uploadError.message });
    }

    const t = await sequelize.transaction();

    try {
        const {
            founderName,
            founderEmail,
            founderPhone,
            startupName,
            industry,
            stage,
            website,
            description
        } = req.body;

        // 1. Find or Create User
        let user = await User.findOne({ where: { email: founderEmail } });

        if (!user) {
            // Create a temporary password for new users
            const tempPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            user = await User.create({
                name: founderName,
                email: founderEmail,
                password_hash: hashedPassword,
                role: 'founder'
            }, { transaction: t });

            // Store temp password for email
            req.tempPassword = tempPassword;

            console.log(`Created user ${founderEmail} with temp password: ${tempPassword}`);
        }

        // 2. Create Startup
        // Check if user already has a startup
        let startup = await Startup.findOne({ where: { founder_id: user.id } });

        if (startup) {
            console.log(`Using existing startup for founder ${founderEmail}`);
        } else {
            startup = await Startup.create({
                name: startupName,
                description: description,
                industry: industry,
                stage: stage,
                website_url: website,
                logo_url: logoUrl, // Use the GCS URL
                founder_id: user.id
            }, { transaction: t });
        }

        // 3. Create Application
        const application = await Application.create({
            startup_id: startup.id,
            program_id: null,
            status: 'submitted',
            submission_data: {
                pitch_deck_url: pitchDeckUrl, // Use the GCS URL
                phone: founderPhone,
                ...req.body
            }
        }, { transaction: t });

        await t.commit();

        // Send email if a new user was created (tempPassword exists)
        if (req.tempPassword) {
            // Run asynchronously, don't block response
            sendWelcomeEmail(founderEmail, founderName, req.tempPassword)
                .catch(err => console.error('Failed to send background email:', err));
        }

        res.status(201).json({
            message: 'Application submitted successfully',
            applicationId: application.id,
            startupId: startup.id
        });

    } catch (error) {
        await t.rollback();
        console.error('Application submission failed:', error);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: 'Validation Error',
                details: error.errors.map(e => e.message)
            });
        }

        res.status(500).json({
            error: 'Failed to submit application',
            details: error.message
        });
    }
});

module.exports = router;
