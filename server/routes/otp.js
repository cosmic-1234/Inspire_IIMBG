const express = require('express');
const router = express.Router();
const { User, Otp } = require('../models');
const { sendOtpEmail } = require('../services/emailService');
const { Op } = require('sequelize');

// Send OTP
router.post('/send', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered. Please login instead.' });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Save or Update OTP in DB
        // We use upsert or findOne/update pattern. Since email is not unique in Otp table (technically),
        // but we want one valid OTP per email. Let's delete old ones first.
        await Otp.destroy({ where: { email } });

        await Otp.create({
            email,
            otp: otpCode,
            expiresAt
        });

        // Send Email
        await sendOtpEmail(email, otpCode);

        res.json({ message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ error: error.message || 'Failed to send OTP' });
    }
});

// Verify OTP
router.post('/verify', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        const validOtp = await Otp.findOne({
            where: {
                email,
                otp,
                expiresAt: { [Op.gt]: new Date() } // Expiry must be in the future
            }
        });

        if (!validOtp) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        // OTP is valid. We can delete it now to prevent reuse.
        await validOtp.destroy();

        res.json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ error: 'Failed to verify OTP' });
    }
});

module.exports = router;
