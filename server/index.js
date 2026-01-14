const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const { sequelize } = require('./models');
const seedUsers = require('./seed_users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'https://inspire-client-tz7jmslgg-uc.a.run.app',
            process.env.CLIENT_URL
        ].filter(Boolean);

        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.run.app')) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
console.log('Loading auth routes...');
const authRoutes = require('./routes/auth');
console.log('Loading startup routes...');
const startupRoutes = require('./routes/startups');
console.log('Loading mentor routes...');
const mentorRoutes = require('./routes/mentors');
console.log('Loading resource routes...');
const resourceRoutes = require('./routes/resources');
console.log('Loading application routes...');
const applicationRoutes = require('./routes/applications');
console.log('Loading contact routes...');
const contactRoutes = require('./routes/contact');
console.log('Loading dashboard routes...');
const dashboardRoutes = require('./routes/dashboard');
console.log('Loading OTP routes...');
const otpRoutes = require('./routes/otp');

app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/otp', otpRoutes);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

// Basic Route
app.get('/', (req, res) => {
    res.send('IIM Bodh Gaya Inspire Backend is running');
});

// Database Sync
const { sequelize } = require('./models');

const syncDatabase = async (retries = 5, delay = 5000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await sequelize.sync({ alter: true });
            console.log('Database synced');
            return;
        } catch (err) {
            console.error(`Failed to sync database (attempt ${i + 1}/${retries}):`, err.message);
            if (i < retries - 1) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
    console.error('Could not connect to database after multiple attempts. Exiting.');
    process.exit(1); // Exit so Docker/Orchestrator can restart it
};

syncDatabase().then(() => {
    // Start Server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
});
