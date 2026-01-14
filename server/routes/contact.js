const express = require('express');
const router = express.Router();
const { Contact } = require('../models');

// Handle Contact Form Submission
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            message: 'Message sent successfully',
            contactId: contact.id
        });

    } catch (error) {
        console.error('Contact submission failed:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
