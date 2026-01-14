const express = require('express');
const router = express.Router();
const { Startup } = require('../models');

// Get all startups
router.get('/', async (req, res) => {
    try {
        const startups = await Startup.findAll();
        res.json(startups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get featured startups (for Success Stories / Home)
router.get('/featured', async (req, res) => {
    try {
        const startups = await Startup.findAll({ where: { featured: true } });
        res.json(startups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get startup by ID
router.get('/:id', async (req, res) => {
    try {
        const startup = await Startup.findByPk(req.params.id);
        if (!startup) return res.status(404).json({ error: 'Startup not found' });
        res.json(startup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a startup (Admin only - simplified for now)
router.post('/', async (req, res) => {
    try {
        const startup = await Startup.create(req.body);
        res.status(201).json(startup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
