const express = require('express');
const router = express.Router();
const { Mentor } = require('../models');

// Get all mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.findAll();
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findByPk(req.params.id);
        if (!mentor) return res.status(404).json({ error: 'Mentor not found' });
        res.json(mentor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a mentor
router.post('/', async (req, res) => {
    try {
        const mentor = await Mentor.create(req.body);
        res.status(201).json(mentor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
