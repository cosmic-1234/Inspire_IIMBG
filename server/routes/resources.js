const express = require('express');
const router = express.Router();
const { Resource } = require('../models');

// Get all resources
router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        const whereClause = type ? { type } : {};
        const resources = await Resource.findAll({ where: whereClause });
        res.json(resources);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a resource
router.post('/', async (req, res) => {
    try {
        const resource = await Resource.create(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
